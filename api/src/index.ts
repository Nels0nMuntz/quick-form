import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mainErrorHandler, routeNotFoundHandler } from "./middlewares";
import { rootRouter } from "./router";

dotenv.config({
  path: path.join(__dirname, "..", `.env.${process.env.NODE_ENV}`),
});

const app = express();
app.use(express.json())
.use(
  cors({
    origin: "*",
    // credentials: true,
    // origin: process.env.WEB_APP_URL,
  })
)
.use("/api", rootRouter)
.use(routeNotFoundHandler)
.use(mainErrorHandler)

export default app;
