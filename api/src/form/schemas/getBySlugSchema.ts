import { z } from "zod";

export const getBySlugSchema = z.object({
  slug: z.string().nonempty(),
});

export type GetBySlugData = z.infer<typeof getBySlugSchema>;
