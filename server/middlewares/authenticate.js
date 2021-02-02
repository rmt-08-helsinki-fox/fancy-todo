const jwt = require('jsonwebtoken')

const authenticate = function (req, res, next) {
    try {
        const token = req.headers.token
        const currentUser = jwt.verify(token, process.env.SECRET_KEY)
        req.currentUser = currentUser
        next()
    } catch(error) {
        next(error)
    }
}

module.exports = { authenticate }