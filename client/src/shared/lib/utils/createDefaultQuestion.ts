import { JSONContent } from "@tiptap/react";
import { FormQuestion, FormQuestionsTypes } from "@/entities/question";
import { buildJsonContent } from "./buildJsonContent";
import { DFAULT_OPTIONS } from "../constants/defaultOptions";
import { generateUniqueId } from "./generateUniqueId";

interface Options {
  type: FormQuestionsTypes;
  id?: string;
  title?: JSONContent;
}

const createDefaultQuestionTitleText = (num?: number) =>
  `Question ${num || "1"}`;

export const createDefaultQuestion = ({ type, id, title }: Options) => {
  const questionId = id || generateUniqueId();
  const questinTitle =
    title ||
    buildJsonContent({
      type: "heading",
      level: 2,
      text: createDefaultQuestionTitleText(),
    });
  switch (type) {
    case "Short text":
      return {
        id: questionId,
        type,
        title: questinTitle,
      } as FormQuestion<"Short text">;
    case "Long text":
      return {
        id: questionId,
        type: "Long text",
        title: questinTitle,
      } as FormQuestion<"Long text">;
    case "Checkbox":
      return {
        id: questionId,
        type: "Checkbox",
        title: questinTitle,
        ...DFAULT_OPTIONS["Checkbox"],
      } as FormQuestion<"Checkbox">;
    case "Dropdown":
      return {
        id: questionId,
        type: "Dropdown",
        title: questinTitle,
        ...DFAULT_OPTIONS["Dropdown"],
      } as FormQuestion<"Dropdown">;
  }
};
