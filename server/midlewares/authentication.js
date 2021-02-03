const jwt = require('jsonwebtoken');

const authentication = function (req, res, next){
    try {
        const token = req.headers.token
        if(!token) throw ({name : 'jwt'})
        const decoded = jwt.verify(token, process.env.SECRET)
        req.decoded = decoded
        next()
    } catch(err){
        next(err)
        console.log(err)
        // res.status(401).json({
        //     message : "invalid token"
        // })
    }
}

module.exports = authentication;