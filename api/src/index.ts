import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import { errorHandler, routeNotFoundHandler } from "./shared/middlewares";
import { appRouter } from "./app.router";
import { registerPassportStrategies } from "./shared";

dotenv.config({
  path: path.join(__dirname, "..", `.env.${process.env.NODE_ENV}`),
});

const app = express();
app
  .use(express.json())
  .use(
    cors({
      origin: "*",
      // credentials: true,
      // origin: process.env.WEB_APP_URL,
    })
  )
  .use(passport.initialize())
  .use("/api", appRouter)
  .use(errorHandler);

registerPassportStrategies();

export default app;
