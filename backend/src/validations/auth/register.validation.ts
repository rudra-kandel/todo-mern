import Joi from 'joi';

export const registerValidationSchema = Joi.object({
    // username: Joi.string().min(3).required().messages({
    //     'string.empty': 'Username is required',
    //     'string.min': 'Username must be at least 3 characters long',
    // }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please include a valid email',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    }),
});
