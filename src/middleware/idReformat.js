const ErrorResponse = require('../helper/errorResponse');

exports.idReformat = (req, res, next) => {
    if (req.params.id) {
        const transformed = Number(req.params.id);
        if (isNaN(transformed)) {
            throw new ErrorResponse(400, `Malformed id: ${req.params.id}`);
        }
        req.params.id = transformed;
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

    if (req.params.taskId) {
        try {
            req.params.taskId = Number(req.params.taskId);
        } catch (error) {
            throw new ErrorResponse(400, 'Malformed id');
        }
    }

    next();
};
