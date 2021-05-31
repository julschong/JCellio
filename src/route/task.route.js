const express = require('express');
const { addTask } = require('../controller/task.controller');
const { authorization } = require('../middleware/authorization');
const { idReformat } = require('../middleware/idReformat');

const taskRoute = express.Router({ mergeParams: true });

taskRoute.route('/').post(idReformat, addTask);

module.exports = taskRoute;
