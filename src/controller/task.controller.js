const asyncHandler = require('express-async-handler');
const prisma = require('../db/db');
const { column, task } = prisma;

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

    const toUpdateColumn = await column.findUnique({ where: { id: columnId } });

    const newTask = await task.create({
        data: {
            name,
            description,
            columnId
        }
    });

    await column.update({
        where: { id: columnId },
        data: { taskPos: [...toUpdateColumn.taskPos, newTask.id] }
    });

    res.status(201).json({ success: true, data: newTask });
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
    const taskId = req.params.taskId;
    const columnId = req.params.columnId;

    const updateColumn = await column.findUnique({ where: { id: columnId } });

    await column.update({
        where: { id: columnId },
        data: {
            taskPos: [...updateColumn.taskPos].filter((pos) => pos !== taskId)
        }
    });

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

exports.updateTask = asyncHandler(async (req, res, next) => {
    const columnId = req.params.columnId;
    const { col, index } = req.query;
    const taskId = req.params.taskId;

    if (col && index) {
        const srcColumn = await column.findUnique({ where: { id: columnId } });
        await column.update({
            where: { id: columnId },
            data: {
                taskPos: [...srcColumn.taskPos].filter((pos) => pos !== taskId)
            }
        });

        const destColumn = await column.findUnique({
            where: { id: Number(col) }
        });

        const newTaskPos = destColumn.taskPos.filter((pos) => pos !== taskId);

        newTaskPos.splice(Number(index), 0, taskId);

        await column.update({
            where: { id: Number(col) },
            data: { taskPos: newTaskPos }
        });
    }

    const updatedTask = await task.update({
        where: {
            id: taskId
        },
        data: {
            ...req.body,
            columnId: col ? Number(col) : undefined
        }
    });
    res.status(200).json({ success: true, data: updatedTask });
});
