import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils";
import formService from "./form.service";
import userService from "../user/user.service";
import { createFormSchema } from "./schemas/createFormSchema";
import { getAllSchema } from "./schemas/getAllSchema";
import { getByIdSchema } from "./schemas/getByIdSchema";
import { removeSchema } from "./schemas/removeSchema";

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const formId = getByIdSchema.parse(req.params);
    const form = await formService.get(formId);
    ApiResponse.sendSuccessResponse({
      res,
      status: 200,
      data: form,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.user?.id as string;
    const query = getAllSchema.parse(req.query);
    const forms = await formService.getAll(userId, query);
    ApiResponse.sendSuccessResponse({
      res,
      status: 200,
      data: forms,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getCurrent(req?.user?.email!);
    const form = createFormSchema.parse(req.body);
    await formService.create(form, user);
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
    const formId = removeSchema.parse(req.params);
    await formService.remove(formId);
    ApiResponse.sendSuccessResponse({
      res,
      status: 204,
    });
  } catch (error) {
    next(error);
  }
};

export default { getOne, getAll, create, remove };
