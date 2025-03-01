import { z } from "zod";

export const getStatsSchema = z.object({
  ids: z.string().refine(
    (value) => {
      const array = value.split(",").map((id) => Number(id));
      const isValid = array.every((id) => Number.isFinite(id));
      return isValid;
    },
    {
      message: "Expected string with forms ids",
    }
  ),
});

export type GetResponsesData = z.infer<typeof getStatsSchema>;
