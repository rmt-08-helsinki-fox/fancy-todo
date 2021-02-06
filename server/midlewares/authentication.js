const { verifyToken } = require('../helper/jwt.js')

const authentication = function (req, res, next){
    try {
        const token = req.headers.token
        if(!token) throw ({name : 'jwt'})
        const decoded = verifyToken(token)
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