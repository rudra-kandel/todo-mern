import AppError from '@utils/error';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { ObjectSchema } from 'joi';

const validateRequest = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: true });

    if (error) {
        //just return the first message only
        const validationErrorMessages = error.details[0].message;
        return next(new AppError(httpStatus.BAD_REQUEST, validationErrorMessages))
    }

    next();
};

export default validateRequest;
