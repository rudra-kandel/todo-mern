import Joi from 'joi';

export const taskValidationSchema = Joi.object({
    title: Joi.string().max(50).required().messages({
        'string.empty': 'Title is required',
        'string.max': 'Title must be less than 50 characters',
    }),
    description: Joi.string().max(100).required().messages({
        'string.empty': 'Description is required',
        'string.max': 'Description must be less than 100 characters',
    }),
});
