const express = require('express');
const {
    getAllBoards,
    createNewBoard,
    getOneBoard,
    deleteBoard,
    updateBoard
} = require('../controller/board.controller');
const { authorization } = require('../middleware/authorization');
const { idReformat } = require('../middleware/idReformat');
const columnRoute = require('./column.route');
const taskRoute = require('./task.route');

const boardRoute = express.Router();

boardRoute.use(authorization);

boardRoute.route('/').get(getAllBoards).post(createNewBoard);

boardRoute
    .route('/:id')
    .get(idReformat, getOneBoard)
    .delete(idReformat, deleteBoard)
    .put(idReformat, updateBoard);

module.exports = boardRoute;
