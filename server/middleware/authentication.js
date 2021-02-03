const { verifyToken } = require('../helpers/jwt');

const auth = (req,res,next) => {
    try{
        let user = verifyToken(req.headers.token);
        if(!user){
            throw { msg : 'Invalid Credentials', statusCode : 401, name : 'custom' }
        }
        req.user = user;
        next()
    }catch(err){
        next(err);
    }
}

module.exports = auth;