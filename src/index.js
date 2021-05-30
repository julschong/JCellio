const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();
app.use(morgan('dev'));
app.use(cors());

const boardRoute = require('./route/board.route');

app.get('/', (req, res, next) => {
    res.send('hello');
});

app.use('/api/v1/boards', boardRoute);

app.use(errorHandler);

app.listen(
    process.env.PORT || 3003,
    console.log(
        `server running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
    )
);
