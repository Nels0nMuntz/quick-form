import { z } from "zod";

export const createFormSchema = z.object({
  name: z.string().nonempty(),
  endsAt: z.string().nullable(),
  config: z.object({
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
        options: z.array(
          z.object({
            id: z.string(),
            value: z.string(),
          })
        ).optional(),
      })
    ),
  }),
});

export type CreateFormData = z.infer<typeof createFormSchema>;
