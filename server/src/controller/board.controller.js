const prisma = require('../db/db');
const { board, column } = prisma;
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../helper/errorResponse');

exports.getAllBoards = asyncHandler(async (req, res, next) => {
    const boards = await board.findMany({
        where: { userId: req.info.id },
        include: {
            columns: {
                include: {
                    tasks: true
                }
            }
        }
    });
    res.status(200).json({ success: true, data: boards });
});

exports.createNewBoard = asyncHandler(async (req, res, next) => {
    const newBoard = await board.create({
        data: { userId: req.info.id, ...req.body }
    });
    res.status(201).json({ success: true, data: newBoard });
});

exports.updateBoard = asyncHandler(async (req, res, next) => {
    res.send('update board');
});

exports.deleteBoard = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const foundBoard = await board.findUnique({
        where: { id },
        include: { columns: { include: { tasks: true } } }
    });

    if (!foundBoard) {
        throw new ErrorResponse(400, 'Board cannot be found');
    }
    if (foundBoard.userId !== req.info.id) {
        throw new ErrorResponse(401, 'Unauthorized');
    }

    await board.delete({ where: { id } });

    res.status(200).json({ success: true, data: [] });
});

exports.getOneBoard = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const foundBoard = await board.findUnique({
        where: { id },
        include: { columns: { include: { tasks: true } } }
    });

    if (!foundBoard) {
        throw new ErrorResponse(400, 'Board cannot be found');
    }
    if (foundBoard.userId !== req.info.id) {
        throw new ErrorResponse(401, 'Unauthorized');
    }

    res.status(200).json({ success: true, data: foundBoard });
});
