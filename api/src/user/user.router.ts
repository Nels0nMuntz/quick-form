import { Router } from "express";
import passport from "passport";
import { validate } from "../shared";
import userController from "./user.controller";
import { signupSchema } from "./schemas/signup.schema";
import { signinSchema } from "./schemas/signin.schema";

export const userRouter = Router();

userRouter.post("/signup", validate(signupSchema), userController.signup);

userRouter.post(
  "/signin",
  validate(signinSchema),
  passport.authenticate("local", { session: false }),
  userController.signin
);
