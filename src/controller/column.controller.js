const asyncHandler = require('express-async-handler');
const prisma = require('../db/db');
const { column } = prisma;

exports.addColumn = asyncHandler(async (req, res, next) => {
    const boardId = req.params.boardId;
    const { title, description } = req.body;
    const newColumn = await column.create({
        data: {
            title,
            description,
            boardId
        }
    });
    res.status(201).json({ success: true, data: newColumn });
});

exports.getColumns = asyncHandler(async (req, res, next) => {
    const boardId = req.params.boardId;
    const columns = await column.findMany({ where: { boardId: boardId } });
    res.status(200).json({ success: true, data: columns });
});

exports.deleteColumn = asyncHandler(async (req, res, next) => {
    const columnId = req.params.columnId;
    await column.delete({ where: { id: columnId } });
    res.status(200).json({ success: true, data: [] });
});
