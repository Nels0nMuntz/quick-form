import { FormQuestionsTypes } from "@/entities/question";

export interface FormResponse {
  id: string;
  formId: number;
  responses: QuestionResponse<FormQuestionsTypes>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionResponse<Type extends FormQuestionsTypes> {
  id: string;
  questionId: string;
  type: Type;
  response: Type extends "Checkbox" ? string[] : string;
  createdAt: Date;
  updatedAt: Date;
}
