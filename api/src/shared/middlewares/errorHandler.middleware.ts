import { NextFunction, Request, Response } from "express";
import { ApiError, ApiResponse } from "../../utils";

export const errorHandler = (
  err: Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error: ", err);
  let error: any = {};
  if (err && err.status && err.message) {
    error = err;
  } else {
    error.message = err.stack || err;
  }
  ApiResponse.sendErrorResponse({ res, error });
};
