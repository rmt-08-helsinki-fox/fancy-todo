const jwt = require('jsonwebtoken')

const authenticate = function(req, res, next){
    try{
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET);
        // console.log(token)
        req.decoded = decoded
        next()
    }catch(err){
        res.status(401).json({
            message: "invalid Token"
        })
    }
}

module.exports = authenticate
