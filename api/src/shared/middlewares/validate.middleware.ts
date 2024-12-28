import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { BadRequestError, InternalServerError } from "../../utils";

export function validate(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        next(new BadRequestError("Invalid data", errorMessages));
      } else {
        next(new InternalServerError());
      }
    }
  };
}
