const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../helper/errorResponse');

exports.authorization = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token);
    if (!token) {
        throw new ErrorResponse(401, 'User not logged in');
    }

    token = token.replace(/^([bB]earer[=\w])/, '');

    try {
        const info = jwt.verify(token, process.env.SECRET);
        req.info = info;
        next();
    } catch (error) {
        throw new ErrorResponse(401, 'Incorrect credential');
    }
});
