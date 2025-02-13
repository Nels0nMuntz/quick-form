import { z } from "zod";

export const removeSchema = z.object({
  id: z.string().nonempty(),
});

export type RemoveData = z.infer<typeof removeSchema>;
