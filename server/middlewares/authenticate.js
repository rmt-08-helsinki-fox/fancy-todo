const jwt = require('jsonwebtoken')

const authenticate = function (req, res, next) {
    try {
        const token = req.headers.token
        const currentUser = jwt.verify(token, process.env.SECRET_KEY)
        req.currentUser = currentUser
        next()
    } catch {
        res.status(401).json({
            error: {
                code: 401,
                message: 'invalid token'
            }
        })
    }
}

module.exports = { authenticate }