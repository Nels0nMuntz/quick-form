import { generateUniqueId } from "../utils/generateUniqueId";

export const DFAULT_OPTIONS: Record<"Checkbox" | "Dropdown", any> = {
  Checkbox: {
    options: [
      {
        id: generateUniqueId(),
        value: "Option 1",
      },
      {
        id: generateUniqueId(),
        value: "Option 2",
      },
      {
        id: generateUniqueId(),
        value: "Option 3",
      },
    ],
    multiple: false,
  },
  Dropdown: {
    options: [
      {
        id: generateUniqueId(),
        value: "Option 1",
      },
      {
        id: generateUniqueId(),
        value: "Option 2",
      },
      {
        id: generateUniqueId(),
        value: "Option 3",
      },
    ],
    multiple: false,
  },
};
