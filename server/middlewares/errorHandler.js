function errorHandler (err, req, res, next) {
    let errors = [];
    let status = 500;

    if(err.name === "SequelizeValidationError"){
        errors = err.errors.map(error => error.message);
        status = 400;
    } else if(err.name === "SequelizeUniqueConstraintError"){
        errors = err.errors.map(error => error.message);
        status = 400;
    } else if(err.name === "customErr") {
        errors.push(err.msg);
        status = err.status;
    } else if(err.name === "JsonWebTokenError") {
        errors.push("Not Logged In");
        status = 401;
    } else {
        errors.push("Internal server error");
    }
    res.status(status).json({errors});
}

module.exports = errorHandler;