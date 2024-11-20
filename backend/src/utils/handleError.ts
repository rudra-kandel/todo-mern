import { QueryError } from 'sequelize';
import AppError from './error';
import logger from './logger';

class HandleError {
  public handleError(error: Error): void {
    if (error instanceof QueryError) {
      logger.error('Database Error: ', {
        message: error.message,
        name: error.name,
        stack: error.stack
      })
    } else {
      logger.error(error);
    }
  }
  public isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}

export default new HandleError();
