const errorHandler = (err, _req, res, _next) => {
    let message = err.message;
    let errorStatus = err.statusCode || 500;

    if (err.code === 'p2002') {
        message = `${err.meta.target.join(', ')} already exist`;
        errorStatus = 200;
    }

    res.status(errorStatus).json({ success: false, error: message });
};

module.exports = errorHandler;
