import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '@config/env.config';
const { saltRounds, jwtSecret, jwtExpirationTime } = config

// Hash Password
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
};

// Verify Password
export const checkPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

// Generate Email Verification Token
export const getEmailVerificationToken = (userId: string): string => {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpirationTime });
};

// Generate Access Token
export const getAccessToken = (userId: string): string => {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpirationTime });
};

// Generate Refresh Token
export const getRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
};

//verify token
export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, jwtSecret) as JwtPayload
}