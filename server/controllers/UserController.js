const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class UserController {
    static register(req, res, next){
        let {email, password} = req.body
        let newUser = {
            email, 
            password
        }
        User.create(newUser,
            {
                returning: true
            })
        .then((result)=>{
            let userData = {
                id: result.id,
                email: result.email
            }
            res.status(201).send(userData)
        })
        .catch((err)=>{
            next(err)
        })
    }
    static login(req, res, next){
        let {email, password} = req.body
        let id
        User.findOne({
            where:{
                email: email
            }
        })
        .then((result)=>{
            if(result){
                id = result.id
                return bcrypt.compare(password, result.password)
            }else{
                next({name: 'LOGIN_GAGAL'})
            }
        })
        .then((isPasswordMatched)=>{
            if(isPasswordMatched){
                let token = jwt.sign({ id: id }, process.env.TOKEN_KEY);
                res.status(200).json(token)
            }else{
                next({name: 'LOGIN_GAGAL'})
            }
        })
        .catch((err)=>{
            next(err)
        })
    }
}

module.exports={
    UserController
}