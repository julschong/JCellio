const express = require('express');
const {
    getAllBoards,
    createNewBoard,
    getOneBoard,
    deleteBoard,
    updateBoard
} = require('../controller/board.controller');

const boardRoute = express.Router();

boardRoute.route('').get(getAllBoards).post(createNewBoard);

boardRoute.route('/:id').get(getOneBoard).delete(deleteBoard).put(updateBoard);

module.exports = boardRoute;
