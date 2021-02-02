const jwt = require('jsonwebtoken')
const { reset, restart } = require('nodemon')

const authenticate = function (req, res, next) {
    try {
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.secretkey)
        req.decoded = decoded
        console.log(decoded)
        next()
    } catch (error) {
        res.status(401).json({
            msg: 'Invalid key'
        })
    }
}

module.exports = { authenticate }