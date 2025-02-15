import { z } from "zod";

export const getResponseSchema = z.object({
  fomrId: z.number(),
});

export type GetResponseData = z.infer<typeof getResponseSchema>;
