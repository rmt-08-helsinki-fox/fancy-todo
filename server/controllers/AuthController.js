const { User } = require('../models');
const { verifyToken, createToken } = require('../helpers/jwt');
const { verifyPassword }  = require('../helpers/bcrypt');
const errorMsg  = require('../helpers/errorMsg');

class AuthController{

    static register = async(req,res) => {
        let { email,password,name } = req.body;
        try{
            await User.create({ email,password,name });
            res.status(201).json({ access_token : createToken({ email,name })});
        }catch(err){
            let error = errorMsg(err);
            res.status(error.statusCodeRes).json(error.msg);
        }
    }

    static login = async(req,res) => {
        let { email,password } = req.body;
        try{
            let user = await User.findOne({where : {email}});
            if(!user){
                throw { msg : "Combination email or password not correct" , statusCode : 401 }
            }
            if(!verifyPassword(password,user.password)){
                throw { msg : "Combination email or password not correct" , statusCode : 401 }
            }
            res.status(200).json({ access_token : createToken({ email : user.email, name : user.name })})
        }catch(err){
            let error = errorMsg(err);
            res.status(error.statusCodeRes).json(error.msg);
        }
    }

}

module.exports = AuthController;