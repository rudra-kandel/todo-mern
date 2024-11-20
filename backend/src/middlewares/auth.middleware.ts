import AppError from "utils/error";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import httpContext from "express-http-context"
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import config from '@config/env.config';

const { jwtSecret } = config;

const authentication = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.header('Authorization') || req.header('RefreshToken');
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {

        throw new AppError(httpStatus.FORBIDDEN, "Token not provided")

    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        //attach the decoded payload to the request context 

        httpContext.set('user', decoded)
        console.log(decoded)
        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Token has expired")
        } else if (err instanceof JsonWebTokenError) {
            throw new AppError(httpStatus.FORBIDDEN, "Token not provided")
        } else {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Token verification failed")
        }
    }
}

export default authentication