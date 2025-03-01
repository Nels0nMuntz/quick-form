import { FormQuestionsTypes } from "@/entities/question";
import { QuestionAnswer } from "./formResponse";

export interface SendResponseData {
  formId: number;
  answers: Pick<
  QuestionAnswer<FormQuestionsTypes>,
    "questionId" | "type" | "value"
  >[];
}
