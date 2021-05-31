const express = require('express');
const {
    addTask,
    getAllTaskByColumn,
    deleteTask,
    getOneTask
} = require('../controller/task.controller');
const { authorization } = require('../middleware/authorization');
const { idReformat } = require('../middleware/idReformat');

const taskRoute = express.Router({ mergeParams: true });

taskRoute
    .route('/')
    .post(idReformat, addTask)
    .get(idReformat, getAllTaskByColumn);

taskRoute
    .route('/:taskId')
    .get(idReformat, getOneTask)
    .delete(idReformat, deleteTask);

module.exports = taskRoute;
