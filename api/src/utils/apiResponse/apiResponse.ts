import { Response } from "express";
import { ApiError } from "../apiErrors/ApiError";

const sendSuccessResponse = ({
  res,
  status,
  data,
}: {
  res: Response;
  status: number;
  data?: any;
}) => {
  res.status(status).json({ success: true, data });
};

const sendErrorResponse = ({
  res,
  error,
}: {
  res: Response;
  error: ApiError;
}) => {
  res
    .status(error.status || 500)
    .json({ success: false, error: error.message, detailes: error.details });
};

export default {
  sendSuccessResponse,
  sendErrorResponse,
};
