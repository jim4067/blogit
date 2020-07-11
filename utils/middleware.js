const logger = require('./logger');

const request_logger = (req, res, next) => {
    logger.info("Method", req.method)
    logger.info("Path", req.path)
    logger.info("Body", req.body)
    logger.info("-------")
    next()
}

const unknown_endpoint = (req, res) => {
    res.status(400).send({error: "unknwown endpoint"})
}

const error_handler = (err, req, res, next) => {
    logger.error(err.message);

    if(err.message === "CastError"){
        return res.status(400).send({error: "malformatted id"});
    } else if(err.message === "ValidationError") {
        return res.status(400).json({error: err.message});
    }

    next(err);
}

module.exports = {
    request_logger,
    unknown_endpoint,
    error_handler
}