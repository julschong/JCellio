const asyncHandler = require('express-async-handler');
const prisma = require('../db/db');
const ErrorResponse = require('../helper/errorResponse');
const { column, task } = prisma;

exports.getAllTaskByColumn = asyncHandler(async (req, res, next) => {
    let columnId = req.query.columnId;
    columnId = columnId ? Number(columnId) : undefined;
    const tasks = await task.findMany({
        where: {
            columnId: columnId
        }
    });
    res.status(200).json({ success: true, data: tasks });
});

exports.addTask = asyncHandler(async (req, res, next) => {
    let { name, description, columnId } = req.body;

    if (!columnId) {
        throw new ErrorResponse(400, `columnId is required`);
    }

    columnId = Number(columnId);

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
    const taskId = req.params.id;

    const taskToDelete = await task.findUnique({ where: { id: taskId } });
    if (!taskToDelete) {
        throw new ErrorResponse(400, `taskId: ${taskId} cannot be found`);
    }

    const columnId = taskToDelete.columnId;

    const updateColumn = await column.findUnique({
        where: { id: columnId }
    });

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
    const { destColId, pos } = req.body;
    const taskId = req.params.id;

    if (destColId === undefined || pos === undefined) {
        throw new ErrorResponse(400, `destColId and pos are required in body`);
    }

    const taskToMove = await task.findUnique({ where: { id: taskId } });

    const srcColId = taskToMove.columnId;

    const scrCol = await column.findUnique({ where: { id: srcColId } });
    await column.update({
        where: { id: srcColId },
        data: { taskPos: scrCol.taskPos.filter((pos) => pos !== taskId) }
    });

    const destCol = await column.findUnique({ where: { id: destColId } });
    destCol.taskPos.splice(pos, 0, taskId);
    await column.update({
        where: { id: destColId },
        data: { taskPos: destCol.taskPos }
    });

    const updatedTask = await task.update({
        where: { id: taskId },
        data: { columnId: destColId }
    });

    res.status(200).json({ success: true, data: updatedTask });
});
