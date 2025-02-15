export interface FormResponseEntity {
  id: string;
  formId: number;
  responses: QuestionResponse<QuestionsType>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionResponse<Type extends QuestionsType> {
  id: string;
  questionId: string;
  type: Type;
  response: Type extends "Checkbox" ? string[] : string;
  createdAt: Date;
  updatedAt: Date;
}

type QuestionsType = "Short text" | "Long text" | "Checkbox" | "Dropdown";
