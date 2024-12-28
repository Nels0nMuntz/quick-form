import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email().nonempty({ message: "Email is required." }),
  password: z.string().nonempty({ message: "Password is required." }).min(6),
});
