import AppError from 'utils/error';
import handleError from 'utils/handleError';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { QueryError } from 'sequelize';
import { sendErrorResponse } from '@utils/response';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error, "error herer")
  handleError.handleError(error);

  let httpStatusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let responseError: { message: string, code?: string } = { message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR] }

  if (error instanceof QueryError) {
    httpStatusCode = httpStatus.BAD_REQUEST;
    responseError = { message: 'Database query failed.' }
  } else if (error instanceof AppError) {
    // Handle custom AppError
    httpStatusCode = error.httpCode;
    responseError = { message: error.message }
  } else {
    const isTrusted = handleError.isTrustedError(error);
    httpStatusCode = isTrusted
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    responseError = {
      message: isTrusted
        ? error.message
        : httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
      code: isTrusted ? 'TRUSTED_ERROR' : 'UNTRUSTED_ERROR'
    }
  }
  sendErrorResponse(res, httpStatusCode, responseError)
};

export default errorHandler
