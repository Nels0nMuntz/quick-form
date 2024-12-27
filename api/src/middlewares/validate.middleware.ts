import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { BadRequestError, InternalServerError } from "../utils";

export function validate(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        throw new BadRequestError({
          message: "Invalid data",
          details: errorMessages,
        });
      } else {
        throw new InternalServerError();
      }
    }
  };
}
