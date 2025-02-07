import { z } from "zod";

export const createFormSchema = z.object({
  name: z.string().nonempty(),
  endsAt: z.date().nullable(),
  config: z.object({
    title: z.object({}).required(),
    description: z.object({}).optional(),
    questions: z.array(
      z.object({
        id: z.string(),
        title: z.object({}),
        type: z.enum(["Short text", "Long text", "Checkbox", "Dropdown"]),
        createdAt: z.date(),
        updatedAt: z.date(),
        required: z.boolean(),
        formConfigId: z.string(),
        options: z.array(
          z.object({
            id: z.string(),
            value: z.string(),
          })
        ),
      })
    ),
  }),
});

export type CreateFormData = z.infer<typeof createFormSchema>;
