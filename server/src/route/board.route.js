const express = require('express');
const {
    getAllBoards,
    createNewBoard,
    getOneBoard,
    deleteBoard,
    updateBoard,
    addColumn
} = require('../controller/board.controller');
const { authorization } = require('../middleware/authorization');
const { idReformat } = require('../middleware/idReformat');
const columnRoute = require('./column.route');

const boardRoute = express.Router();

boardRoute.use('/:boardId/columns', columnRoute);
boardRoute.use(authorization);

boardRoute.route('/').get(getAllBoards).post(createNewBoard);

boardRoute
    .route('/:id')
    .get(getOneBoard)
    .delete(idReformat, deleteBoard)
    .put(updateBoard);

module.exports = boardRoute;
