const prisma = require('../db/db');
const { board, column } = prisma;
const asyncHandler = require('express-async-handler');

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
    console.log(newBoard);
    res.status(201).json({ success: true, data: newBoard });
});

exports.updateBoard = asyncHandler(async (req, res, next) => {
    res.send('update board');
});

exports.deleteBoard = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    console.log(typeof id);
    await column.deleteMany({
        where: {
            boardId: id
        }
    });
    await board.delete({
        where: { id: id }
    });

    res.status(200).json({ success: true, data: [] });
});

exports.getOneBoard = asyncHandler(async (req, res, next) => {
    res.send('get one board');
});
