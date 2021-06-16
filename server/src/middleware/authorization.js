const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../helper/errorResponse');
const prisma = require('../db/db');
const { user } = prisma;

exports.authorization = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        throw new ErrorResponse(401, 'User not logged in');
    }

    token = token.replace(/^([bB]earer[=\s])/, '');

    try {
        const info = jwt.verify(token, process.env.SECRET);
        const usercheck = await user.findUnique({ where: { id: info.id } });

        if (usercheck.email !== info.email || usercheck.name !== info.name) {
            throw new ErrorResponse(401, 'Incorrect credential');
        }

        req.info = info;
        next();
    } catch (error) {
        throw new ErrorResponse(401, 'Incorrect credential');
    }
});
