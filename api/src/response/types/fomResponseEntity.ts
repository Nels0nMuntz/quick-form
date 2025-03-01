export interface FormResponseEntity {
  id: string;
  formId: number;
  answers: QuestionAnswer<QuestionsType>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionAnswer<Type extends QuestionsType> {
  id: string;
  questionId: string;
  type: Type;
  value: Type extends "Checkbox" ? string[] : string;
  createdAt: Date;
  updatedAt: Date;
}

type QuestionsType = "Short text" | "Long text" | "Checkbox" | "Dropdown";
