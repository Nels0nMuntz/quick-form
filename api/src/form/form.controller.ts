import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils";
import { createUserDataMapper } from "./dataMappers/createFormDataMapper";
import formService from "./form.service";
import userService from "../user/user.service";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const formId = Number(req.params.id);
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
    const forms = await formService.getAll(userId);
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
    const form = createUserDataMapper(req.body);
    await formService.create(form, user);
    ApiResponse.sendSuccessResponse({
      res,
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

export default { get, getAll, create };
