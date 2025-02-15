import { Router } from "express";
import { ApiResponse, NotFoundError } from "./utils";
import { userRouter } from "./user";
import { formRouter } from "./form";
import { responseRouter } from "./response";

export const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/status", (req, res) => {
  ApiResponse.sendSuccessResponse({
    res,
    status: 200,
    data: {
      message: "API is running",
    },
  });
});
appRouter.use("/forms", formRouter);
appRouter.use("/responses", responseRouter);
appRouter.use("/*", (req, res) => {
  ApiResponse.sendErrorResponse({
    res,
    error: new NotFoundError("Route not found"),
  });
});
