import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .email()
    .nonempty({ message: "Email is required." }),
  password: z
    .string({ message: "Password is required." })
    .nonempty({ message: "Password is required." })
    .min(6, { message: "Password must contain at least 6 characters" }),
});
