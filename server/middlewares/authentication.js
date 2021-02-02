const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    try {
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET)
        
        req.decoded = decoded
        next()
    } catch (error) {
        next({name: 'custom', msg: 'Invalid token'})
    }
}

module.exports = {authentication}