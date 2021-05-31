const asyncHandler = require('express-async-handler');
const prisma = require('../db/db');
const { task } = prisma;

exports.addTask = asyncHandler(async (req, res, next) => {
    const columnId = req.params.columnId;
    const { name, description } = req.body;
    const newTask = await task.create({
        data: {
            name,
            description,
            columnId
        }
    });
    res.status(201).json({ success: true, data: newTask });
});
