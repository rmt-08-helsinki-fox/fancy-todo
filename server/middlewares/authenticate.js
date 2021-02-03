const jwt = require('jsonwebtoken')

const authenticate = function(req, res, next){
    try{
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET);
        // console.log(token)
        req.decoded = decoded
        next()
    }catch(err){
        err.name = "Invalid Token"
        // res.status(401).json({
        //     message: "invalid Token"
        // })
        next(err)
    }
}

module.exports = authenticate
