import { buildJsonContent } from "../utils/buildJsonContent";
import { generateUniqueId } from "../utils/generateUniqueId";

export const DFAULT_OPTIONS: Record<"Checkbox" | "Dropdown", any> = {
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
