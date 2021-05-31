const errorHandler = (err, _req, res, _next) => {
    let message = err.message;
    let errorStatus = err.statusCode || 500;

    console.log(err);

    if (err.code === 'P2002') {
        message = `${err.meta.target.join(', ')} already exist`;
        errorStatus = 200;
    }

    if (err.code === 'P2003') {
        message = `${err.meta.field_name} error`;
        errorStatus = 400;
    }

    if (err.code === 'P2025') {
        message = err.meta.cause;
        errorStatus = 400;
    }

    res.status(errorStatus).json({ success: false, error: message });
};

module.exports = errorHandler;
