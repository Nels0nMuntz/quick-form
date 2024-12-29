import { Router } from "express";
import { authenticateWith, authStrategies, validate } from "../shared";
import userController from "./user.controller";
import { signupSchema } from "./schemas/signup.schema";
import { signinSchema } from "./schemas/signin.schema";

export const userRouter = Router();

userRouter.post("/signup", validate(signupSchema), userController.signup);

userRouter.post(
  "/signin",
  validate(signinSchema),
  authenticateWith(authStrategies.credentials),
  userController.signin
);

userRouter.get(
  "/",
  authenticateWith(authStrategies.jwt),
  userController.getCurrent
);
