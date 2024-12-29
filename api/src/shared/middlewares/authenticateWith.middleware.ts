import { Request, Response, NextFunction } from "express";
import { AuthenticationStrategy } from "../types";

export const authenticateWith = (strategy: AuthenticationStrategy) => {
  return (req: Request, res: Response, next: NextFunction) => {
    strategy(req, res, next);
  };
};
