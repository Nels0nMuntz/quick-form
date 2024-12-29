import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUserDataMapper } from "./dataMappers/createUserDataMapper";
import userService from "./user.service";
import apiResponse from "../utils/apiResponse/apiResponse";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createUserDataMapper(req.body);
    await userService.create(data);
    apiResponse.sendSuccessResponse({
      res,
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = jwt.sign(
      { 
        id: req?.user?.id,
        email: req?.user?.email
      },
      process.env.JWT_SECRET || "",
      { expiresIn: "15m" }
    );
    apiResponse.sendSuccessResponse({
      res,
      status: 200,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getCurrent(req?.user?.email!);
    apiResponse.sendSuccessResponse({
      res,
      status: 200,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  signin,
  getCurrent,
};
