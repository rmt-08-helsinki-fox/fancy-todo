const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req, res, next){
        let {name, email, password} = req.body
        let newUser = {
            name,
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
        console.log(req.body)
        let {email, password} = req.body
        let id
        let name
        User.findOne({
            where:{
                email: email
            }
        })
        .then((result)=>{
            if(result){
                id = result.id
                name = result.name
                return bcrypt.compare(password, result.password)
            }else{
                next({name: 'LOGIN_GAGAL'})
            }
        })
        .then((isPasswordMatched)=>{
            if(isPasswordMatched){
                let token = jwt.sign({ id: id }, process.env.TOKEN_KEY);
                res.status(200).json({token: token, name: name})
            }else{
                next({name: 'LOGIN_GAGAL'})
            }
        })
        .catch((err)=>{
            next(err)
        })
    }
    static auth(req, res, next){
        let {token} = req.headers
        // console.log(token)
        // console.log(process.env.TOKEN_KEY)
        // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        let tokenData = jwt.verify(token, process.env.TOKEN_KEY);
        // console.log(tokenData)
        User.findByPk(tokenData.id)
        .then((result)=>{
            let user={
                name: result.name,
                email: result.email
            }
            console.log(user)
            res.status(200).json(user)
        })
        .catch((err)=>{
            next({name: 'TOKEN_INVALID'})
        })
    }
    static async googleLogin(req, res, next){
        try{
            console.log('google login')
            console.log(req.headers.token)
            console.log(process.env.CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: req.headers.token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload()
            console.log('get payload berhasil')
            console.log(payload)
            let {given_name, email} = payload

            console.log(given_name, email)

            // normal login
            let checkUser = await User.findOne({
                where: {
                    email: email
                }
            })
            if(checkUser){
                console.log(checkUser)
                let token = jwt.sign({ id: checkUser.id }, process.env.TOKEN_KEY);
                console.log(token)
                res.status(200).json({token: token, name: checkUser.name})
            }else{
                // user does not exist
                // create user
                let newUser = {
                    name: given_name,
                    email,
                    password: 'googleUser'
                }
                let userCreated = await User.create(newUser)
                let token2 = jwt.sign({ id: userCreated.id }, process.env.TOKEN_KEY);
                res.status(200).json({token: token2, name:userCreated.name})
            }
            
        }catch(err){
            next(err)
        }
    }
}

module.exports={
    UserController
}