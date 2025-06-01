import Joi from "joi";
import { StatusCodes } from 'http-status-codes';
import ApiError from "../utils/ApiError";

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(30).messages({
            'string.base': 'Title must be a string',
            'string.empty': 'Title cannot be empty',
            'string.min': 'Title must be at least 3 characters long',
            'string.max': 'Title must not exceed 30 characters',
            'any.required': 'Title is required'
        }),
        description: Joi.string().max(500).optional().messages({
            'string.base': 'Description must be a string',
            'string.max': 'Description must not exceed 500 characters',
            'string.empty': 'Description cannot be empty',
        }),
    });
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next(); // Call next middleware if validation passes
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)); // Pass the error to the error handling middleware
    }

}
export const boardValidation = {
    createNew,
}