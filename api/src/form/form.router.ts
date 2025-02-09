import { Router } from "express";
import { authenticateWith, authStrategies, validate } from "../shared";
import formController from "./form.controller";
import { getAllSchema } from "./schemas/getAllSchema";
import { getByIdSchema } from "./schemas/getByIdSchema";
import { createFormSchema } from "./schemas/createFormSchema";

export const formRouter = Router();

formRouter.get(
  "/",
  authenticateWith(authStrategies.jwt),
  validate(getAllSchema, (req) => req.query),
  formController.getAll
);

formRouter.get(
  "/:id",
  authenticateWith(authStrategies.jwt),
  validate(getByIdSchema, (req) => req.params),
  formController.getOne
);

formRouter.post(
  "/",
  authenticateWith(authStrategies.jwt),
  validate(createFormSchema),
  formController.create
);
