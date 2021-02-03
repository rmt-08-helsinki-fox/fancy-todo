const { User } = require('../models');
const { verifyToken, createToken } = require('../helpers/jwt');
const { verifyPassword }  = require('../helpers/bcrypt');

class AuthController{

    static register = async(req,res,next) => {
        let { email,password,name } = req.body;
        try{
            let user = await User.create({ email,password,name });
            res.status(201).json({ name, email });
        }catch(err){
            next(err);
        }
    }

    static login = async(req,res,next) => {
        let { email,password } = req.body;
        try{
            let user = await User.findOne({where : {email}});
            if(!user){
                throw { msg : "Combination email or password not correct" , statusCode : 401, name: 'custom' }
            }
            if(!verifyPassword(password,user.password)){
                throw { msg : "Combination email or password not correct" , statusCode : 401, name: 'custom' }
            }
            res.status(200).json({ access_token : createToken({ id : user.id, email : user.email, name : user.name })})
        }catch(err){
            next(err)
        }
    }

}

module.exports = AuthController;