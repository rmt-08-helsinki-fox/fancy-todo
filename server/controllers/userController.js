const {Todo, User} = require("../models/index")
const {compare} = require("../helpers/bcrypt")
const {token} = require("../helpers/generateToken")

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
                    email,
                    password
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
}

module.exports = UserController