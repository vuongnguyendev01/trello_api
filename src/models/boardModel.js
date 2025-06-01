import Joi, { date } from "joi";
import { ObjectId } from "mongodb";

import { GET_DB } from "~/config/mongodb";

// Define collection name and schema for the Board model
const BOARD_COLLECTION_NAME = 'boards';
const BOARD_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(30).trim().strict(),
    description: Joi.string().max(500).optional().trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    columnOrderIds: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
});

const createNew = async (data) => {
    try {
        const validateDate = await validateBeforeCreate(data);
        const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validateDate)
        return createdBoard
    } catch (error) {
        throw new Error(error)

    }
}

const findOneById = async (id) => {
    try {
        const board = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(String(id)) });
        return board;
    } catch (error) {
        throw new Error(error);
    }
}

const validateBeforeCreate = async (data) => {
    return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
}

const getDetails = async (id) => {
    try {
        const board = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(String(id)) });
        return board;
    } catch (error) {
        throw new Error(error);
    }
}



export const boardModel = {
    BOARD_COLLECTION_NAME,
    BOARD_COLLECTION_SCHEMA,
    createNew,
    findOneById,
    getDetails,
}