const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const prisma = require('../db/db');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../helper/errorResponse');
const { user } = prisma;

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { email, password, name } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await user.create({
        data: {
            email,
            password: passwordHash,
            name
        }
    });

    delete newUser.password;

    res.status(201).json({ success: true, data: newUser });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const dbUser = await user.findUnique({ where: { email: email } });

    if (!dbUser) {
        throw new ErrorResponse(401, 'Username or password does not match');
    }

    const match = await bcrypt.compare(password, dbUser.password);

    if (match) {
        const token = jwt.sign(
            { id: dbUser.id, name: dbUser.name, email: dbUser.email },
            process.env.SECRET
        );
        res.status(200).json({ success: true, token });
    } else {
        throw new ErrorResponse(401, 'Username or password does not match');
    }
});
