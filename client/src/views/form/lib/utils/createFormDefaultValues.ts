import { PartialFormQuestion } from "@/entities/question";
import { QuestionsFormValues } from "../../model/types/questiosFormvValues";

export const createFormDefaultValues = (questions: PartialFormQuestion[]) => {
  return questions.reduce((all, curr) => {
    if (curr.type === "Checkbox" && curr.options) {
      all[curr.id] = [];
    } else {
      all[curr.id] = "";
    }
    return all;
  }, {} as QuestionsFormValues);
};
