import { Request, Response } from "express";
import { ApiError, ApiResponse } from "../utils";

export const mainErrorHandler = (
  err: Partial<ApiError>,
  req: Request,
  res: Response
) => {
  let error: any = {};

  if (err && err.status && err.message) {
    error = err;
  } else {
    error.message = err.stack || err;
  }
  console.log("Error: ", error);
  ApiResponse.sendErrorResponse(res, error);
};
