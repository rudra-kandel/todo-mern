import config from '@config/env.config';
import { ILoginUser, IRegisterUser } from '@interfaces/user';
import { loginUser, registerUser, verifyUserEmail } from '@services/user.service';
import { verifyToken } from '@utils/authUtils';
import { sendSuccessResponse } from '@utils/response';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
const { appUrl } = config

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userDto: IRegisterUser = req.body;

        const newUser = await registerUser(userDto);

        return sendSuccessResponse(res, httpStatus.CREATED, "Registered Sucessfully.Please check your email for verification")
    } catch (error) {
        next(error)
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userLoginDto: ILoginUser = req.body

        const token = await loginUser(userLoginDto);

        return sendSuccessResponse(res, httpStatus.OK, "Login Sucessful", token)
    } catch (error) {
        next(error)
    }
};

export { login, register };

