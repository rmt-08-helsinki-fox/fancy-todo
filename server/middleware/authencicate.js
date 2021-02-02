const jwt = require('jsonwebtoken')

const authencicate = function (req,res,next) {
    try{
        const token = req.headers.token
        const decoded = jwt.verify(token,process.env.SECRET)
        req.decoded = decoded
        next()
    }catch(err){
        next({name:'TokenInvalid'})
    }    
}

module.exports = authencicate