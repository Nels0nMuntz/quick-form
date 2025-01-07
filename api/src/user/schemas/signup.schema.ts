import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: "Full name is required." })
    .min(2, { message: "Name must contain at least 2 characters" }),
  email: z.string().email().nonempty({ message: "Email is required." }),
  password: z
    .string()
    .nonempty({ message: "Password is required." })
    .min(6, { message: "Password must contain at least 6 characters" }),
});
