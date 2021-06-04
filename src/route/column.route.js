const express = require('express');
const {
    addColumn,
    getColumns,
    deleteColumn,
    getOneColumnById,
    updateColumn
} = require('../controller/column.controller');
const { authorization } = require('../middleware/authorization');
const { idReformat } = require('../middleware/idReformat');

const columnRoute = express.Router();

columnRoute.use(authorization);

columnRoute.route('/').get(idReformat, getColumns).post(idReformat, addColumn);
columnRoute
    .route('/:id')
    .get(idReformat, getOneColumnById)
    .delete(idReformat, deleteColumn)
    .put(idReformat, updateColumn);

module.exports = columnRoute;
