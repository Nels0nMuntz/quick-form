import { z } from "zod";

export const getAllSchema = z.object({
  take: z.string().optional(),
  skip: z.string().optional(),
  search: z.string().optional(),
});

export type GetAllFormData = z.infer<typeof getAllSchema>;
