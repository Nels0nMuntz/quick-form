import express from "express";
import { StatusController } from "../controllers";

export const rootRouter = express.Router();

rootRouter.use("/status", StatusController.status);
