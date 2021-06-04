const express = require('express');
const {
    addTask,
    getAllTaskByColumn,
    deleteTask,
    getOneTask,
    updateTask
} = require('../controller/task.controller');
const { authorization } = require('../middleware/authorization');
const { idReformat } = require('../middleware/idReformat');

const taskRoute = express.Router();

taskRoute.use(authorization);

taskRoute
    .route('/')
    .post(idReformat, addTask)
    .get(idReformat, getAllTaskByColumn);

taskRoute
    .route('/:id')
    .get(idReformat, getOneTask)
    .delete(idReformat, deleteTask)
    .put(idReformat, updateTask);

module.exports = taskRoute;
