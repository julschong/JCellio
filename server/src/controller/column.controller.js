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
