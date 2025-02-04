import { Router } from "express";
import { authenticateWith, authStrategies } from "../shared";
import formController from "./form.controller";

export const formRouter = Router();

formRouter.get(
  "/:id",
  authenticateWith(authStrategies.jwt),
  formController.get
);

formRouter.post(
  "/",
  authenticateWith(authStrategies.jwt),
  formController.create
);
