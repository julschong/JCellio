const asyncHandler = require('express-async-handler');
const prisma = require('../db/db');
const ErrorResponse = require('../helper/errorResponse');
const { board, column } = prisma;

exports.getColumns = asyncHandler(async (req, res, next) => {
    const { boardId } = req.query;
    const columns = await column.findMany({
        where: { boardId: Number(boardId) },
        include: { tasks: true }
    });
    res.status(200).json({ success: true, data: columns });
});

exports.getOneColumnById = asyncHandler(async (req, res, next) => {
    const columnId = req.params.id;
    const foundColumn = await column.findUnique({
        where: { id: columnId },
        include: { tasks: true }
    });

    if (!foundColumn) {
        throw new ErrorResponse(
            400,
            `Column id: ${req.params.id} cannot be found`
        );
    }

    res.status(200).json({ success: true, data: foundColumn });
});

exports.addColumn = asyncHandler(async (req, res, next) => {
    const { title, description, boardId } = req.body;

    if (!boardId) {
        new ErrorResponse(400, `BoardId is required`);
    }

    const updateBoard = await board.findUnique({ where: { id: boardId } });
    if (!updateBoard) {
        throw new ErrorResponse(400, `Board id ${boardId}`);
    }

    const newColumn = await column.create({
        data: {
            title,
            description,
            boardId
        }
    });

    await board.update({
        where: { id: boardId },
        data: { colPos: [...updateBoard.colPos, newColumn.id] }
    });

    res.status(201).json({ success: true, data: newColumn });
});

exports.deleteColumn = asyncHandler(async (req, res, next) => {
    const columnToDelete = await column.findUnique({
        where: { id: req.params.id }
    });

    if (!columnToDelete) {
        throw new ErrorResponse(
            400,
            `Column id: ${req.params.id} cannot be found`
        );
    }

    const boardToUpdate = await board.findUnique({
        where: { id: columnToDelete.boardId }
    });

    await board.update({
        where: { id: columnToDelete.boardId },
        data: {
            colPos: [...boardToUpdate.colPos].filter(
                (pos) => pos !== req.params.id
            )
        }
    });

    await column.delete({ where: { id: req.params.id } });

    res.status(200).json({ success: true, data: [] });
});
