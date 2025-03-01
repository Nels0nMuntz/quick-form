import { z } from "zod";

export const getResponseSchema = z.object({
  id: z.string(),
});

export type GetResponseData = z.infer<typeof getResponseSchema>;
