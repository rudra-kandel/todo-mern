import Joi from 'joi';

export const loginValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please include a valid email',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    }),
});
