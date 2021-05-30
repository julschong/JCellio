const prisma = require('../db/db');
const { board } = prisma;
const asyncHandler = require('express-async-handler');

exports.getAllBoards = asyncHandler(async (req, res, next) => {
    const boards = await board.findMany();
    res.status(200).json({ success: true, data: boards });
});

exports.createNewBoard = asyncHandler(async (req, res, next) => {
    const newBoard = await board.create({ data: {} });
    console.log(newBoard);
    res.status(201).json({ success: true, data: newBoard });
});

exports.updateBoard = asyncHandler(async (req, res, next) => {
    res.send('update board');
});

exports.deleteBoard = asyncHandler(async (req, res, next) => {
    res.send('delete board');
});

exports.getOneBoard = asyncHandler(async (req, res, next) => {
    res.send('get one board');
});
