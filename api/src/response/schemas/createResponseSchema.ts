import { z } from "zod";

export const createResponseSchema = z.object({
  formId: z.number(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      type: z.enum(["Short text", "Long text", "Checkbox", "Dropdown"]),
      value: z.union([z.string(), z.array(z.string())]),
    })
  ),
});

export type CreateResponseData = z.infer<typeof createResponseSchema>;
