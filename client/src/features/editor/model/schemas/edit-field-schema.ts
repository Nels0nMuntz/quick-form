import { z } from "zod";

export const editFieldSchema = z.object({
  editField: z.string(),
});
