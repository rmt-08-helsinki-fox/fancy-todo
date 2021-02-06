const jwt = require('jsonwebtoken')

const authenticate = function(req, res, next){
    try {
        const token = req.headers.access_token
        const decoded = jwt.verify(token, process.env.SECRET)
        req.decoded = decoded

        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid Token'
        })
    }
}

module.exports = authenticate