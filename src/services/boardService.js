
import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';
import ApiError from '../utils/ApiError';
import { StatusCodes } from 'http-status-codes';

const createNew = async (reqBody) => {
    try {
        //Validate body theo board schema
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title),
        }
        // -> Call model to create new board
        const createdBoard = await boardModel.createNew(newBoard);

        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);


        return getNewBoard;
    } catch (error) {
        throw error;
    }

}

const getDetails = async (boardId) => {
    try {
        const board = await boardModel.getDetails(boardId);
        if (!board) {
            throw new ApiError(StatusCodes.NOT_FOUND, `Board with id ${boardId} not found`);
        }
        return board;
    } catch (error) {
        throw error;
    }

}

export const boardService = {
    createNew,
    getDetails,
}