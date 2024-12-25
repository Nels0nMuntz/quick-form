import { z } from "zod";

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const signUpFormSchema = z.object({
  fullname: z
    .string()
    .nonempty({ message: "Full name is required." })
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(50, { message: "Full name must be no more than 50 characters long." })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Full name can only contain letters, spaces, apostrophes, and hyphens.",
    }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .nonempty({ message: "Email is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (@, $, !, %, *, ?, &).",
    }),
});
