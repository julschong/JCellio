const express = require('express');
const {
    addColumn,
    getColumns,
    deleteColumn,
    getOneColumnById
} = require('../controller/column.controller');
const { authorization } = require('../middleware/authorization');
const { idReformat } = require('../middleware/idReformat');
const taskRoute = require('./task.route');

const columnRoute = express.Router();

columnRoute.route('/').get(idReformat, getColumns).post(idReformat, addColumn);
columnRoute
    .route('/:id')
    .get(idReformat, getOneColumnById)
    .delete(idReformat, deleteColumn);

module.exports = columnRoute;
