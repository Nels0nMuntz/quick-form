import { Request, Response } from "express";
import { ApiResponse, NotFound } from "../utils";

export const routeNotFoundHandler = (req: Request, res: Response) => {
  ApiResponse.sendErrorResponse(res, new NotFound("Route not found"));
};
