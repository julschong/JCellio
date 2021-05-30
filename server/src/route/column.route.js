const express = require('express');
const { addColumn } = require('../controller/column.controller');
const { authorization } = require('../middleware/authorization');
const { idReformat } = require('../middleware/idReformat');

const columnRoute = express.Router({ mergeParams: true });

columnRoute.route('').post(idReformat, addColumn);

module.exports = columnRoute;
