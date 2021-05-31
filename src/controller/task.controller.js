const asyncHandler = require('express-async-handler');
const prisma = require('../db/db');
const { task } = prisma;

exports.getAllTaskByColumn = asyncHandler(async (req, res, next) => {
    const columnId = req.params.columnId;
    const tasks = await task.findMany({
        where: {
            columnId: columnId
        }
    });
    res.status(200).json({ success: true, data: tasks });
});

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

exports.deleteTask = asyncHandler(async (req, res, next) => {
    const taskId = req.params.taskId;
    await task.delete({
        where: {
            id: taskId
        }
    });
    res.status(200).json({ success: true, data: [] });
});

exports.getOneTask = asyncHandler(async (req, res, next) => {
    const taskId = req.params.taskId;
    const foundTask = await task.findUnique({
        where: {
            id: taskId
        }
    });
    res.status(200).json({ success: true, data: foundTask });
});
