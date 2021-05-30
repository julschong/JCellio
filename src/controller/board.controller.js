const prisma = require('../db/db');
const { board, column } = prisma;
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../helper/errorResponse');

exports.getAllBoards = asyncHandler(async (req, res, next) => {
    console.log(req.info);
    const boards = await board.findMany({
        where: { userId: req.info.id },
        include: { Column: true }
    });
    res.status(200).json({ success: true, data: boards });
});

exports.createNewBoard = asyncHandler(async (req, res, next) => {
    const newBoard = await board.create({ data: { userId: req.info.id } });
    res.status(201).json({ success: true, data: newBoard });
});

exports.updateBoard = asyncHandler(async (req, res, next) => {
    res.send('update board');
});

exports.deleteBoard = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    await board.delete({ where: { id } });

    res.status(200).json({ success: true, data: [] });
});

exports.getOneBoard = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const foundBoard = await board.findUnique({
        where: { id },
        include: { Column: true }
    });

    if (!foundBoard) {
        throw new ErrorResponse(400, 'Board cannot be found');
    }

    res.status(200).json({ success: true, data: foundBoard });
});
