import { ILoginUser, IRegisterUser } from '@interfaces/user';
import User from '@models/User';
import { checkPassword, getAccessToken, hashPassword } from '@utils/authUtils';
import AppError from '@utils/error';
import httpStatus from 'http-status';

const registerUser = async (userDto: IRegisterUser) => {
    const { email, password } = userDto;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    return newUser;
};

const loginUser = async (userDto: ILoginUser) => {
    const { email, password } = userDto
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid Credentials");
    }
    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid Credentials");
    }
    if (!user.isVerified) {
        throw new AppError(httpStatus.NOT_FOUND, 'Please verify your email');
    }
    const accessToken = getAccessToken(user.id);
    return { accessToken };
};

const verifyUserEmail = async (userId: string) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, "User not found");
    }

    user.isVerified = true;
    await user.save();
};

export { loginUser, registerUser, verifyUserEmail };

