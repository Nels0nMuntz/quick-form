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
  constructor(options?: { message: string; details?: any }) {
    super(
      options?.message || "Bad Request",
      StatusCodes.BAD_REQUEST,
      options?.details
    );
  }
}

export class ForbiddenError extends ApiError {
  constructor(options?: { message: string; details?: any }) {
    super(
      options?.message || "Forbidden",
      StatusCodes.FORBIDDEN,
      options?.details
    );
  }
}

export class NotAuthorizedError extends ApiError {
  constructor(options?: { message: string; details?: any }) {
    super(
      options?.message || "Not Authorized",
      StatusCodes.UNAUTHORIZED,
      options?.details
    );
  }
}

export class NotFoundError extends ApiError {
  constructor(options?: { message: string; details?: any }) {
    super(
      options?.message || "Not Found",
      StatusCodes.NOT_FOUND,
      options?.details
    );
  }
}

export class InternalServerError extends ApiError {
  constructor(options?: { message: string; details?: any }) {
    super(
      options?.message || "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR,
      options?.details
    );
  }
}

export class UnprocessableEntityError extends ApiError {
  constructor(options?: { message: string; details?: any }) {
    super(
      options?.message || "Unprocessable Entity",
      StatusCodes.UNPROCESSABLE_ENTITY,
      options?.details
    );
  }
}
