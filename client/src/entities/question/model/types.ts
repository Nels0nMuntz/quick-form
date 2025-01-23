import { OmitNever } from "@/shared/model";

import { PartialByKeys } from "@/shared/model";
import { JSONContent } from "@tiptap/react";

interface BaseFormQuestion<Type extends FormQuestionsTypes> {
  id: string;
  title: JSONContent;
  body: Type extends "Short text" | "Long text" ? TextBody : SelectBody;
  type: Type;
  multiple: Type extends "Checkbox" | "Dropdown" ? boolean : never;
  options: Type extends "Checkbox" | "Dropdown" ? string[] : never;
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

type TextBody = JSONContent;
type SelectBody = {
  options: { id: string; value: string }[];
};

export interface QuestionComponentProps {
  id: string;
}
