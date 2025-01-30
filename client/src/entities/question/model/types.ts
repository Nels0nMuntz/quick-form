import { EditorJSONContent, OmitNever } from "@/shared/model";
import { PartialByKeys } from "@/shared/model";

export interface BaseFormQuestion<Type extends FormQuestionsTypes> {
  id: string;
  type: Type;
  title: EditorJSONContent;
  // text: Type extends "Short text" | "Long text" ? JSONContent : never;
  multiple: Type extends "Checkbox" | "Dropdown" ? boolean : never;
  options: Type extends "Checkbox" | "Dropdown" ? FormQuestionOption[] : never;
  required?: boolean;
}

export type PartialFormQuestion = PartialByKeys<
  BaseFormQuestion<FormQuestionsTypes>,
  "options" | "multiple"
>;

export type FormQuestion<Type extends FormQuestionsTypes> = OmitNever<
  BaseFormQuestion<Type>
>;

export type FormQuestionsTypes =
  | "Short text"
  | "Long text"
  | "Checkbox"
  | "Dropdown";

export interface FormQuestionOption {
  id: string;
  value: EditorJSONContent;
}

export interface QuestionComponentProps {
  id: string;
  actions: React.ReactNode;
  dropdown: React.ReactNode;
  body: React.ReactNode;
}
