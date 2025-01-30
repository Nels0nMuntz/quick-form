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
    addQuestion: () => void;
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
  const defaultQuestion = createDefaultQuestion({
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
      [defaultQuestion.id]: defaultQuestion,
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
      addQuestion: () => {
        set((state) => {
          const defaultQuestion = createDefaultQuestion({
            type: "Checkbox",
          });
          const title = buildJsonContent({
            type: "heading",
            level: 2,
            text: `Question ${Object.keys(state.questions).length + 1}`,
          });
          defaultQuestion.title = title;
          return {
            questions: {
              ...state.questions,
              [defaultQuestion.id]: defaultQuestion,
            },
          };
        });
      },
      copyQuestion: (questionId) => {
        set((state) => {
          const newQuestion = {
            ...state.questions[questionId],
            id: generateUniqueId(),
          };
          const questions = Object.values(state.questions);
          const index = questions.findIndex(({ id }) => id === questionId);
          if (index < 0) return state;
          const before = questions.slice(0, index);
          const after = questions.slice(index + 1);
          const all = before
            .concat(questions[index])
            .concat(newQuestion)
            .concat(after);
          return {
            questions: all.reduce(
              (obj, question) => {
                obj[question.id] = question;
                return obj;
              },
              {} as Record<string, PartialFormQuestion>,
            ),
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
