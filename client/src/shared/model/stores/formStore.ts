import { create } from "zustand";
import { JSONContent } from "@tiptap/react";
import { PartialFormQuestion } from "@/entities/form";
import { useShallow } from "zustand/react/shallow";

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
  };
}

type FormStore = FormState & FormActions;

export const useFormStore = create<FormStore>()((set) => {
  const uniqueid = "111";
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
    },
  };
});

export const useFormTitle = () => useFormStore((state) => state.title);
export const useFormDescription = () =>
  useFormStore((state) => state.description);
export const useFormQuestions = () =>
  useFormStore(useShallow((state) => Object.values(state.questions)));
export const useFormQuestion = (id: string) => useFormStore(useShallow(state => state.questions[id]))

export const useFormActions = () => useFormStore((state) => state.actions);
