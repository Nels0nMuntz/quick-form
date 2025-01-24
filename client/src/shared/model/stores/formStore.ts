import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { JSONContent } from "@tiptap/react";
import { v4 as uuidv4 } from "uuid";
import { PartialFormQuestion } from "@/entities/question";

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
  };
}

type FormStore = FormState & FormActions;

export const useFormStore = create<FormStore>()((set, get) => {
  const uniqueid = uuidv4();
  return {
    title: JSON.parse(
      '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Title"}]}]}',
    ),
    description: JSON.parse(
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Description"}]}]}',
    ),
    questions: {
      [uniqueid]: {
        id: uniqueid,
        type: "Short text",
        title: JSON.parse(
          '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Question 1"}]}]}',
        ),
        body: JSON.parse(
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Short answer text"}]}]}',
        ),
      },
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
            id: uuidv4(),
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
