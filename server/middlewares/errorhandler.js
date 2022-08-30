function errorhandler(err, req, res, next) {
    let errStatus = 500
    let errMsg = 'Internal Server Error'
    // console.log(err.name)
    if (err.name === 'SequelizeUniqueConstraintError') {
        const errors = err.errors.map(el => el.message)
        errStatus = 400
        errMsg = errors
    } else if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(el => el.message)
        errStatus = 400
        errMsg = errors
    } else if (err.name === 'custom') {
        errStatus = err.status
        errMsg = err.msg
    } else if (err.name === 'DATA_NOT_FOUND') {
        errStatus = 404
        errMsg = "Data not found"
    } else if (err.name === 'NOT_AUTHORIZED') {
        errStatus = 403
        errMsg = "User not authorized"
    } else if (err.name === 'JsonWebTokenError') {
        errStatus = 401
        errMsg = 'User need login'
    } else if (err.name === 'INVALID_EMAIL_OR_PASSWORD') {
        errStatus = 401
        errMsg = "Invalid email or password"
    }
    res.status(errStatus).json({ errMsg })
}

module.exports = errorhandler