import { Router } from "express";
import { authenticateWith, authStrategies, validate } from "../shared";
import formController from "./form.controller";
import { getAllSchema } from "./schemas/getAllSchema";
import { getByIdSchema } from "./schemas/getByIdSchema";
import { createFormSchema } from "./schemas/createFormSchema";
import { removeSchema } from "./schemas/removeSchema";
import { getBySlugSchema } from "./schemas/getBySlugSchema";

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

formRouter.get(
  "/public/:slug",
  validate(getBySlugSchema, (req) => req.params),
  formController.getOnePublic
);

formRouter.post(
  "/",
  authenticateWith(authStrategies.jwt),
  validate(createFormSchema),
  formController.create
);

formRouter.delete(
  "/:id",
  authenticateWith(authStrategies.jwt),
  validate(removeSchema, (req) => req.params),
  formController.remove
);
