import { NextFunction, Request, Response } from "express";
import { createResponseSchema } from "./schemas/createResponseSchema";
import responseService from "./response.service";
import ApiResponse from "../utils/apiResponse/apiResponse";
import { getResponseSchema } from "./schemas/getResponseSchema";
import { getStatsSchema } from "./schemas/getStatsSchema";
import { removeResponseSchema } from "./schemas/removeResponseSchema";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = getResponseSchema.parse(req.params);
    const formResponse = await responseService.get(data);
    ApiResponse.sendSuccessResponse({
      res,
      status: 200,
      data: formResponse,
    });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = getStatsSchema.parse(req.query);
    const formResponse = await responseService.getStats(data);
    ApiResponse.sendSuccessResponse({
      res,
      status: 200,
      data: formResponse,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createResponseSchema.parse(req.body);
    await responseService.create(data);
    ApiResponse.sendSuccessResponse({
      res,
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = removeResponseSchema.parse(req.params);
    await responseService.remove(data);
    ApiResponse.sendSuccessResponse({
      res,
      status: 204,
    });
  } catch (error) {
    next(error);
  }
};

export default { get, getStats, create, remove };
