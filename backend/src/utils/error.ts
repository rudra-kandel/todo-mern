export default class AppError extends Error {
  public readonly code?: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(
    httpCode: number,
    description: string,
    isOperational: boolean = true,
    code?: string
  ) {
    super(description);
    //restoring the prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.code = code;

    Error.captureStackTrace(this);
  }
}
