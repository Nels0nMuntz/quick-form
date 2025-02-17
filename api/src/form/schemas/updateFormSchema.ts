import { z } from "zod";

export const updateFormSchema = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  endsAt: z.string().nullable(),
  config: z.object({
    id: z.string().nonempty(),
    title: z.record(z.any(), z.any()),
    description: z.record(z.any(), z.any()),
    questions: z.array(
      z.object({
        id: z.string(),
        title: z.record(z.any(), z.any()),
        type: z.enum(["Short text", "Long text", "Checkbox", "Dropdown"]),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        required: z.boolean(),
        formConfigId: z.string().optional(),
        options: z
          .array(
            z.object({
              id: z.string(),
              value: z.string(),
            })
          )
          .optional(),
      })
    ),
  }),
});

export type UpdateFormData = z.infer<typeof updateFormSchema>;
