const ErrorResponse = require('../helper/errorResponse');

const ipRestrict = (req, res, next) => {
    console.log(req.headers.host);
    if (
        process.env.NODE_ENV === 'production' &&
        !req.headers.host.contains('julschong')
    ) {
        throw new ErrorResponse(401, `Unauthorized Access`);
    }
    next();
};

module.exports = ipRestrict;
