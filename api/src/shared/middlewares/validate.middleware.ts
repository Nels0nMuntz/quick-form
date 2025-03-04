import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { InternalServerError, UnprocessableEntityError } from "../../utils";

export function validate(
  schema: z.ZodObject<any, any>,
  extractor?: (req: Request) => any
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = extractor ? extractor(req) : req.body;
      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        next(new UnprocessableEntityError("Invalid data", errorMessages));
      } else {
        next(new InternalServerError());
      }
    }
  };
}
