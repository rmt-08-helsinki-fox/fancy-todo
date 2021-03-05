const jwt = require('jsonwebtoken')

function authenticate(req ,res, next) {
    try{
        let token = req.headers.accesstoken
        let decoded = jwt.verify(token, process.env.SECRET)
        req.headers.User = decoded
        next()
    }
    catch{
        res.status(401).json({Message: 'Invalid Token'})
    }
}

module.exports = authenticate