import { z } from "zod";

export const getByIdSchema = z.object({
  id: z.string().nonempty(),
});

export type GetByIdData = z.infer<typeof getByIdSchema>;
