const {User} = require("../models/index")
const {compare} = require("../helpers/bcrypt")
const {token} = require("../helpers/generateToken")
const {OAuth2Client} = require('google-auth-library');

class UserController{

    static postRegister(req, res, next){
        const { email, password } = req.body
        User.create({email, password})
        .then((user)=>{
            res.status(201).json({
                msg:"Register Success",
                id: user.id,
                email: user.email
            })
        })
        .catch((err)=>{
            next(err)
        })
    }

    static postLogin(req,res,next){
        const { email, password } = req.body
        User.findOne({where:{email}})
        .then((user)=>{
            if (!user) throw({name:"ErrorLogin", msg: "invalid pass or email"})
            const match = compare(password, user.password)
            if (match) {
                const accessToken = token({
                    id: +user.id,
                    email
                })
                console.log(accessToken);
                res.status(200).json({accessToken})
            } else {
                throw({name:"ErrorLogin", msg: "invalid pass or email"})
            }
        })
        .catch((err)=>{
            next(err)
        })
    }

    static googleLogin(req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email;
        client.verifyIdToken({
            idToken:req.body.googleToken,
            audience: process.env.CLIENT_ID
        })
        .then((ticket)=>{
            const payload = ticket.getPayload()
            email = payload.email
            return User.findOne({where:{email}})
        })
        .then((user)=>{
            if (user){
                const accessToken = token({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({accessToken})
            }else{
                return User.create({
                    email,
                    password: process.env.PASS_GOOGLE
                })
            } 
        })
        .then((userGoogle)=>{
            const accessToken = token({
                id: +userGoogle.id,
                email: userGoogle.email
            })
            res.status(201).json({accessToken})
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

module.exports = UserController