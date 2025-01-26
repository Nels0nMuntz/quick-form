import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { JSONContent } from "@tiptap/react";
import { FormQuestionsTypes, PartialFormQuestion } from "@/entities/question";
import {
  createDefaultQuestion,
  buildJsonContent,
  generateUniqueId,
} from "@/shared/lib";
import { EditorJSONContent } from "../types/EditorJSONContent";

interface FormState {
  title: JSONContent;
  description?: JSONContent;
  questions: Record<string, PartialFormQuestion>;
}

interface FormActions {
  actions: {
    setTitle: (json: JSONContent) => void;
    setDescription: (json: JSONContent) => void;
    setQuestion: (question: PartialFormQuestion) => void;
    copyQuestion: (id: string) => void;
    deleteQuestion: (id: string) => void;
    toggleRequired: (id: string) => void;
    changeQuestionType: (id: string, value: FormQuestionsTypes) => void;
    addOption: (id: string) => void;
    updateOption: (
      questionId: string,
      optionId: string,
      json: EditorJSONContent,
    ) => void;
    deleteOption: (questionId: string, optionId: string) => void;
  };
}

type FormStore = FormState & FormActions;

const DFAULT_FORM_TITLE_TEXT = "Title";
const DFAULT_FORM_DESCRIPTION_TEXT = "Description";

export const useFormStore = create<FormStore>()((set) => {
  const defaultShortQuestion = createDefaultQuestion({
    type: "Checkbox",
  });
  return {
    title: buildJsonContent({
      type: "heading",
      level: 1,
      text: DFAULT_FORM_TITLE_TEXT,
    }),
    description: buildJsonContent({
      type: "paragraph",
      text: DFAULT_FORM_DESCRIPTION_TEXT,
    }),
    questions: {
      [defaultShortQuestion.id]: defaultShortQuestion,
    },
    actions: {
      setTitle: (json) => set({ title: json }),
      setDescription: (json) => set({ description: json }),
      setQuestion: (question) =>
        set((state) => ({
          questions: {
            ...state.questions,
            [question.id]: { ...question },
          },
        })),
      copyQuestion: (id) => {
        set((state) => {
          const newQuestion = {
            ...state.questions[id],
            id: generateUniqueId(),
          };
          return {
            questions: {
              ...state.questions,
              [newQuestion.id]: newQuestion,
            },
          };
        });
      },
      deleteQuestion: (id) =>
        set((state) => {
          const questions = state.questions;
          delete questions[id];
          return {
            questions: {
              ...questions,
            },
          };
        }),
      toggleRequired: (id) =>
        set((state) => ({
          questions: {
            ...state.questions,
            [id]: {
              ...state.questions[id],
              required: !state.questions[id].required,
            },
          },
        })),
      changeQuestionType: (id, value) => {
        set((state) => {
          const questionToUpdate = state.questions[id];
          const question = createDefaultQuestion({
            type: value,
            id: questionToUpdate.id,
            title: questionToUpdate.title,
          });
          question.id = id;
          return {
            questions: {
              ...state.questions,
              [id]: question,
            },
          };
        });
      },
      addOption: (id) =>
        set((state) => ({
          questions: {
            ...state.questions,
            [id]: {
              ...state.questions[id],
              options: [
                ...(state.questions[id].options || []),
                {
                  id: generateUniqueId(),
                  value: buildJsonContent({
                    type: "paragraph",
                    text: `Option ${(state.questions[id].options || []).length + 1}`,
                  }),
                },
              ],
            },
          },
        })),
      updateOption: (questionId, optionId, json) => {
        set((state) => ({
          questions: {
            ...state.questions,
            [questionId]: {
              ...state.questions[questionId],
              options: [
                ...(state.questions[questionId].options || []).map((option) =>
                  option.id !== optionId ? { ...option, value: json } : option,
                ),
              ],
            },
          },
        }));
      },
      deleteOption: (questionId, optionId) => {
        set((state) => ({
          questions: {
            ...state.questions,
            [questionId]: {
              ...state.questions[questionId],
              options: [
                ...(state.questions[questionId].options || []).filter(
                  ({ id }) => id !== optionId,
                ),
              ],
            },
          },
        }));
      },
    },
  };
});

export const useFormTitle = () => useFormStore((state) => state.title);
export const useFormDescription = () =>
  useFormStore((state) => state.description);
export const useFormQuestions = () =>
  useFormStore(useShallow((state) => Object.values(state.questions)));
export const useFormQuestion = (id: string) =>
  useFormStore(useShallow((state) => state.questions[id]));

export const useFormActions = () => useFormStore((state) => state.actions);
