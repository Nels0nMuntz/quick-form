import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string({ message: "Full name is required." })
    .nonempty({ message: "Full name is required." })
    .min(2, { message: "Name must contain at least 2 characters" }),
  email: z
    .string({ message: "Email is required." })
    .email()
    .nonempty({ message: "Email is required." }),
  password: z
    .string({ message: "Password is required." })
    .nonempty({ message: "Password is required." })
    .min(6, { message: "Password must contain at least 6 characters" }),
});
