import { FormQuestionsTypes } from "@/entities/question";

export interface FormResponse {
  id: string;
  formId: number;
  answers: QuestionAnswer<FormQuestionsTypes>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionAnswer<Type extends FormQuestionsTypes> {
  id: string;
  questionId: string;
  type: Type;
  value: Type extends "Checkbox" ? string[] : string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormResponseStats {
  count: number;
  lastResponseDate: string;
}
