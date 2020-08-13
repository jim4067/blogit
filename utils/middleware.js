const logger = require('./logger');

/* annoyingly not working as expected
const request_logger = (req, res, next) => {
    logger.info("Method", req.method)
    logger.info("Path", req.path)
    logger.info("Body", req.body)
    logger.info("-------")
    next()
}
*/

const unknown_endpoint = (req, res) => {
    res.status(400).send({error: "unknwown endpoint"})
}

const error_handler = (err, req, res, next) => {
    logger.error(err.message);

    if(err.message === "CastError"){
        return res.status(400).send({error: "malformatted id"});
    } else if(err.message === "ValidationError") {
        return res.status(400).json({error: err.message});
    } else if(err.message = "JsonWebTokenError"){
        res.status(401).json({error : " invalid token"});
    }

    next(err);
}

const token_extractor = (req, res, next) => {
    let token;
    const authorization = req.headers.authorization;
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        token = authorization.substring(7);
        return token;
    }
    return null;
   
    next();
}

module.exports = {
    unknown_endpoint,
    error_handler,
    token_extractor
}