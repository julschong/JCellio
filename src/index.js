const express = require('express');

const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'dev') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(cors());

const boardRoute = require('./route/board.route');
const authRoute = require('./route/auth.route');
const columnRoute = require('./route/column.route');
const taskRoute = require('./route/task.route');

app.get('/', (req, res, next) => {
    res.send('hello');
});

app.use('/api/v1/boards', boardRoute);
app.use('/api/v1/columns', columnRoute);
app.use('/api/v1/tasks', taskRoute);
app.use('/api/v1/auth', authRoute);

app.use(errorHandler);

app.listen(
    process.env.PORT || 3003,
    console.log(
        `server running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
    )
);
