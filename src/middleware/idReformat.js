const ErrorResponse = require('../helper/errorResponse');

exports.idReformat = (req, res, next) => {
    if (req.params.id) {
        try {
            req.params.id = Number(req.params.id);
        } catch (error) {
            throw new ErrorResponse(400, 'Malformed id');
        }
    }

    if (req.params.boardId) {
        try {
            req.params.boardId = Number(req.params.boardId);
        } catch (error) {
            throw new ErrorResponse(400, 'Malformed id');
        }
    }

    if (req.params.columnId) {
        try {
            req.params.columnId = Number(req.params.columnId);
        } catch (error) {
            throw new ErrorResponse(400, 'Malformed id');
        }
    }

    next();
};
