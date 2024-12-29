import { NextFunction, Request, Response } from "express";

export type AuthenticationStrategy = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
