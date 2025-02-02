import { EditorJSONContent, OmitNever } from "@/shared/model";
import { PartialByKeys } from "@/shared/model";

export interface BaseFormQuestion<Type extends FormQuestionsTypes> {
  id: string;
  type: Type;
  title: EditorJSONContent;
  options: Type extends "Checkbox" | "Dropdown" ? FormQuestionOption[] : never;
  required?: boolean;
}

export type PartialFormQuestion = PartialByKeys<
  BaseFormQuestion<FormQuestionsTypes>,
  "options"
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
  value: string;
}

export interface QuestionComponentProps {
  id: string;
  body: React.ReactNode;
  actions?: React.ReactNode;
  dropdown?: React.ReactNode;
}
