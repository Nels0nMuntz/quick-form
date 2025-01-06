import { StatusCodes } from "http-status-codes";

class NextError extends Error {
  public status?: number;
  public details?: any;

  constructor(message: string);
  constructor(message: string, status: number);
  constructor(message: string, details: any);
  constructor(message: string, status?: number, details?: any);
  constructor(message: string, status?: number, details?: any) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.status = status || StatusCodes.INTERNAL_SERVER_ERROR;
    this.details = details || {};
  }
}

export class BadRequestError extends NextError {
  constructor(message?: string, details?: any) {
    super(message || "Bad Request", StatusCodes.BAD_REQUEST, details);
  }
}

export class UnauthorizedError extends NextError {
  constructor(message?: string, details?: any) {
    super(message || "Unauthorized here", StatusCodes.UNAUTHORIZED, details);
  }
}

export class InternalServerError extends NextError {
  constructor(message?: string, details?: any) {
    super(message || "Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR, details);
  }
}
