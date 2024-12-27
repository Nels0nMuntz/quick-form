import { Response } from "express";
import { ApiError } from "../apiErrors/ApiError";

const sendSuccessResponse = (response: Response, status: number, data: any) => {
  response.status(status).json({ success: true, data });
};

const sendErrorResponse = (response: Response, error: ApiError) => {
  response
    .status(error.status || 500)
    .json({ success: false, error: error.message });
};

export default {
  sendSuccessResponse,
  sendErrorResponse,
};
