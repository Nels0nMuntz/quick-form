import { Router } from "express";
import { getJson, getHtml, create } from "./form.controller";
import { authenticateWith, authStrategies } from "../shared";

export const formConfigRouter = Router();

formConfigRouter.get("/", getJson);
formConfigRouter.get("/html", getHtml);
formConfigRouter.post("/", create);
