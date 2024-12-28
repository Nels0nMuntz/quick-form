import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  public status: number;
  public details: any;

  constructor(message: string, status?: number, details?: any) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || StatusCodes.INTERNAL_SERVER_ERROR;
    this.message = message;
    this.details = details;
  }
}

export class BadRequestError extends ApiError {
  constructor(message?: string, details?: any) {
    super(message || "Bad Request", StatusCodes.BAD_REQUEST, details);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message?: string, details?: any) {
    super(message || "Forbidden", StatusCodes.FORBIDDEN, details);
  }
}

export class NotAuthorizedError extends ApiError {
  constructor(message?: string, details?: any) {
    super(message || "Not Authorized", StatusCodes.UNAUTHORIZED, details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message?: string, details?: any) {
    super(message || "Not Found", StatusCodes.NOT_FOUND, details);
  }
}

export class InternalServerError extends ApiError {
  constructor(message?: string, details?: any) {
    super(
      message || "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR,
      details
    );
  }
}

export class UnprocessableEntityError extends ApiError {
  constructor(message?: string, details?: any) {
    super(
      message || "Unprocessable Entity",
      StatusCodes.UNPROCESSABLE_ENTITY,
      details
    );
  }
}
