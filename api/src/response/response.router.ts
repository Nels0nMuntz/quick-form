import { Router } from "express";
import { authenticateWith, authStrategies, validate } from "../shared";
import { getResponseSchema } from "./schemas/getResponseSchema";
import responseController from "./response.controller";
import { createResponseSchema } from "./schemas/createResponseSchema";
import { getStatsSchema } from "./schemas/getStatsSchema";

export const responseRouter = Router();

responseRouter.get(
  "/stats",
  authenticateWith(authStrategies.jwt),
  validate(getStatsSchema, (req) => req.query),
  responseController.getStats
);

responseRouter.get(
  "/:id",
  authenticateWith(authStrategies.jwt),
  validate(getResponseSchema, (req) => req.params),
  responseController.get
);

responseRouter.post(
  "/",
  validate(createResponseSchema),
  responseController.create
);

responseRouter.delete(
  "/:id",
  authenticateWith(authStrategies.jwt),
  validate(getResponseSchema, (req) => req.params),
  responseController.remove
);
