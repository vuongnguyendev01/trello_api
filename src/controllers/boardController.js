import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { boardService } from '~/services/boardService';



const createNew = async (req, res, next) => {
    try {
        const createdBoard = await boardService.createNew(req.body);
        res.status(StatusCodes.CREATED).json(createdBoard)
    } catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
    try {
        const boardId = req.params.id;
        const borad = await boardService.getDetails(boardId);
        res.status(StatusCodes.OK).json(borad)
    } catch (error) { next(error) }
}

export const boardController = {
    createNew,
    getDetails,
}