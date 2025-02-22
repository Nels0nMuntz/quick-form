import { FormQuestionsTypes } from "@/entities/question";
import { QuestionResponse } from "./formResponse";

export interface SendResponseData {
  formId: number;
  responses: Pick<
    QuestionResponse<FormQuestionsTypes>,
    "questionId" | "type" | "response"
  >[];
}
