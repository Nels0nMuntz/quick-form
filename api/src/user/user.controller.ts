import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUserDataMapper } from "./dataMappers/createUserDataMapper";
import userService from "./user.service";
import apiResponse from "../utils/apiResponse/apiResponse";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = jwt.sign(
      { id: req?.userData?.id },
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

export default {
  signup,
  signin,
};
