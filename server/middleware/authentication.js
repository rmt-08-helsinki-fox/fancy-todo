const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models')

const auth = async(req,res,next) => {
    try{
        let user = verifyToken(req.headers.access_token);
        if(!user){
            throw { msg : 'Invalid Credentials', statusCode : 401, name : 'custom' }
        }
        let checkUser = await User.findOne({ where : { email : user.email } });
        if(!checkUser){
            throw { msg : 'Invalid Credentials', statusCode : 401, name : 'custom' }
        }
        req.user = user;
        next()
    }catch(err){
        next(err);
    }
}

module.exports = auth;