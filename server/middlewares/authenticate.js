const jwt = require('jsonwebtoken')

const authenticate = function (req, res, next) {
    try {
        const accessToken = req.headers.accesstoken
        const currentUser = jwt.verify(accessToken, process.env.SECRET_KEY)
        req.currentUser = currentUser
        next()
    } catch(error) {
        console.log(error.name);
        next(error)
    }
}

module.exports = { authenticate }