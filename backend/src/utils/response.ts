import { Response } from 'express';
interface IPagination {
    count: number
}
interface IResponse<T> {
    status: string,
    message: string,
    data?: T,
    pagination?: IPagination
}

export const sendSuccessResponse = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T,
    pagination?: IPagination
) => {
    const responsePayload: IResponse<T> = {
        status: 'Sucess',
        message
    }
    if (data) {
        responsePayload.data = data
    }
    if (pagination) {
        responsePayload.pagination = pagination
    }
    res.status(statusCode).json(responsePayload);
};

export const sendErrorResponse = (
    res: Response,
    statusCode: number,
    error: { code?: string, message?: string }
) => {
    res.status(statusCode).json({
        status: 'error',
        error: error || null,
    });
};
