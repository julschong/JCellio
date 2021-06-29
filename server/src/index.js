const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(
    process.env.PORT || 3003,
    console.log(
        `server running on ${process.env.NODE_ENV} mode on port ${
            process.env.PORT || 3003
        }`
    )
);
