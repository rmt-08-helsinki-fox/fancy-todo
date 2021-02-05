const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) =>{
    try {
        const token = req.headers.token
        const decode = jwt.verify(token, process.env.SECRET)  
        req.decode = decode
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authenticate