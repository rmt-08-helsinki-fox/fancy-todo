const errorHandler = function(err, req, res, next) {
    if (err.name === "customError") {
        return res.status(err.status).json({
            message: err.msg
        })
    }
    else if (err.name === "SequelizeUniqueConstraintError") {
        const errorMsg = err.errors.map(el => el.message)
        res.status(400).json({
            errorMsg
        })
    }
    else if (err.name === "SequelizeValidationError") {
        const errorMsg = err.errors.map(el => el.message)
        res.status(500).json({
            errorMsg
        })
    }
}

module.exports = errorHandler