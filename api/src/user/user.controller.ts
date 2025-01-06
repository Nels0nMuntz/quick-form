import { NextFunction, Request, Response } from "express";
import { createUserDataMapper } from "./dataMappers/createUserDataMapper";
import userService from "./user.service";
import apiResponse from "../utils/apiResponse/apiResponse";
import { tokenService } from "../token";
import { signInUserDataMapper } from "./dataMappers/signInUserDataMapper";

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
    const { email } = signInUserDataMapper(req.body);
    const user = await userService.getCurrent(email);
    const { accessToken, refreshToken } = await userService.createTokensPair(
      user
    );
    res.cookie("jwt_access", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("jwt_refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    });
    apiResponse.sendSuccessResponse({
      res,
      status: 200,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const signout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt_refresh;
    await tokenService.remove(token);
    res.clearCookie("jwt_refresh");
    apiResponse.sendSuccessResponse({
      res,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt_refresh;
    const { accessToken, refreshToken } = await userService.refreshToken(token);
    res.cookie("jwt_access", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("jwt_refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    apiResponse.sendSuccessResponse({
      res,
      status: 200,
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
  signout,
  refresh,
  getCurrent,
};
