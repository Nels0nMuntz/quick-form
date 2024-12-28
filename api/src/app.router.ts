import { Router } from "express";
import { userRouter } from "./user";
import { ApiResponse, NotFoundError } from "./utils";

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
appRouter.use("/*", (req, res) => {
  ApiResponse.sendErrorResponse({
    res,
    error: new NotFoundError("Route not found"),
  });
});
