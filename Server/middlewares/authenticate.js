const jwt = require('jsonwebtoken')

function authenticate(req ,res, next) {
    try{
        let token = req.headers.token
        let decoded = jwt.verify(token, process.env.SECRET);
        req.headers.UserId = decoded.id
        next()
    }
    catch{
        res.status(401).json({Message: 'Invalid Token'})
    }
}

module.exports = authenticate