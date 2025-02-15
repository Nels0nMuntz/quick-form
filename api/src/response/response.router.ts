import { Router } from "express";
import { authenticateWith, authStrategies, validate } from "../shared";
import { getResponseSchema } from "./schemas/getResponseSchema";
import responseController from "./response.controller";
import { createResponseSchema } from "./schemas/createResponseSchema";

export const responseRouter = Router();

responseRouter.get(
  "/:id",
  authenticateWith(authStrategies.jwt),
  validate(getResponseSchema, (req) => req.params),
  responseController.get
);

responseRouter.post(
  "/",
  authenticateWith(authStrategies.jwt),
  validate(createResponseSchema),
  responseController.create
);

responseRouter.delete(
  "/:id",
  authenticateWith(authStrategies.jwt),
  validate(getResponseSchema, (req) => req.params),
  responseController.remove
);
