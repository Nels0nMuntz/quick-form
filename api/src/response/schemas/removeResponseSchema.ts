import { z } from "zod";

export const removeResponseSchema = z.object({
  responseId: z.string(),
});

export type RemoveResponseData = z.infer<typeof removeResponseSchema>;
