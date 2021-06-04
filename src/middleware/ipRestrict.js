const ErrorResponse = require('../helper/errorResponse');

const ipRestrict = (req, res, next) => {
    const ip = (
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        ''
    )
        .split(',')[0]
        .trim();
    // if (
    //     process.env.NODE_ENV === 'production' &&
    //     !req.headers.fwd.contains('julschong')
    // ) {
    //     throw new ErrorResponse(401, `Unauthorized Access`);
    // }
    next();
};

module.exports = ipRestrict;
