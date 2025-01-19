import { JSONContent } from "@tiptap/react";

export interface FormConfig {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  data: {
    title: JSONContent;
    description?: JSONContent;
    questions: FormQuestion<FormQuestionsTypes>[];
  };
}

interface FormQuestion<Type extends FormQuestionsTypes> {
  id: string;
  question: string;
  required: boolean;
  multiple: Type extends "Checkbox" | "Dropdown" ? boolean : never;
  options: Type extends "Checkbox" | "Dropdown" ? string[] : never;
}

type FormQuestionsTypes =
  | "Sort answer"
  | "Long answer"
  | "Checkbox"
  | "Dropdown";



