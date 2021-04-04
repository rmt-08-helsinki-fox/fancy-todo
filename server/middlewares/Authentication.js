const jwt = require('jsonwebtoken')

const Authentication = (req, res, next) => {
    // console.log('authentication')
    // console.log(req.params.id)
    try{
        if(!req.headers.token){
            throw {name: 'TOKEN_INVALID'}
        }
        // console.log(req.headers.token)
        req.userData = jwt.verify(req.headers.token, process.env.TOKEN_KEY);
        // console.log(req.userData)
        next()
    }catch(err){
        next({name: 'TOKEN_INVALID'})
    }
}

module.exports={
    Authentication
}