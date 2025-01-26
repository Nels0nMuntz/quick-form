import { FormQuestionsTypes } from "@/entities/question";
import { buildJsonContent } from "../utils/buildJsonContent";
import { generateUniqueId } from "../utils/generateUniqueId";

export const DFAULT_ANSWER: Record<FormQuestionsTypes, any> = {
  "Short text": {
    text: buildJsonContent({
      type: "paragraph",
      text: "Short answer text",
    }),
  },
  "Long text": {
    text: buildJsonContent({
      type: "paragraph",
      text: "Long answer text",
    }),
  },
  Checkbox: {
    options: [
      {
        id: generateUniqueId(),
        value: buildJsonContent({
          type: "paragraph",
          text: "Option 1",
        }),
      },
      {
        id: generateUniqueId(),
        value: buildJsonContent({
          type: "paragraph",
          text: "Option 2",
        }),
      },
      {
        id: generateUniqueId(),
        value: buildJsonContent({
          type: "paragraph",
          text: "Option 3",
        }),
      },
    ],
    multiple: false,
  },
  Dropdown: {
    options: [
      {
        id: generateUniqueId(),
        value: buildJsonContent({
          type: "paragraph",
          text: "Option 1",
        }),
      },
      {
        id: generateUniqueId(),
        value: buildJsonContent({
          type: "paragraph",
          text: "Option 2",
        }),
      },
      {
        id: generateUniqueId(),
        value: buildJsonContent({
          type: "paragraph",
          text: "Option 3",
        }),
      },
    ],
    multiple: false,
  },
};
