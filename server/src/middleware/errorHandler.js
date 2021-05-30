const errorHandler = (err, req, res, next) => {
    let message = err.message;
    let errorStatus = 500;

    res.status(errorStatus).json({ success: false, error: message });
};

module.exports = errorHandler;
