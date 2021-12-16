const { User } = require('../models');
const { verifyToken, createToken } = require('../helpers/jwt');
const { verifyPassword }  = require('../helpers/bcrypt');
const {OAuth2Client} = require('google-auth-library');

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

    static signInWithGoogle = async(req,res,next) => {
        try {
            const client = new OAuth2Client(process.env.goauth_clientid);
            let token = req.body.token;
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.goauth_clientid, 
            });
            const payload = ticket.getPayload();
            let user = await User.findOne({ where : { email : payload.email } })
            if(!user){
                user = await User.create({ email : payload.email, name : payload.name, password : new Date().getTime().toString() })
                res.status(201).json({ access_token : createToken({ id : user.id, email : user.email, name : user.name })});
            }else{
                res.status(200).json({ access_token : createToken({ id : user.id, email : user.email, name : user.name })});
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
        
      
    }

}

module.exports = AuthController;