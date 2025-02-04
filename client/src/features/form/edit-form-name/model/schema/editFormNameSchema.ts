import { z } from "zod";

export const editFormNameSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .max(100, { message: "Form name must be 100 characters or less" })
    .regex(/^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.?*\/-]*$/, {
      message:
        "Only letters, numbers, spaces, and special signs (e.g., !@#$%^&*()_+-=) are allowed",
    }),
});
