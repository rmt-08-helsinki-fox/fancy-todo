const {User} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const { OAuth2Client } = require("google-auth-library");

class ControllerUser{
    static register(req, res, next){
        const {email, password} = req.body
        User.create({
            email,
            password
        })
        .then(data=>{
            res.status(201).json({
                id: data.id,
                email: data.email
            })
        })
        .catch(err=>{
            err.name = 'Invalid Email'
            next(err)
        })
    }

    static login(req, res, next){
        const {email, password} = req.body

        User.findOne({
            where:{
                email
            }
        })
        .then(user => {
            if(!user) throw {msg: 'Invalid Token'}
            const comparedPass = comparePass(password, user.password)
            // console.log(comparedPass)
            if(!comparedPass) throw {msg: 'Invalid Token'}
          
            const access_token = generateToken({
                id: user.id,
                email: user.email
            })
            
            res.status(200).json({
                access_token,
                email: user.email
            })
        })
        .catch(err=>{
            err.name = err.msg
            console.log(err)
            next(err)
        })
    }

    static googleLogin(req, res, next) {
        console.log('>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<')
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ''
        let password = ''
        client  
            .verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.CLIENT_id
            })
            .then((ticket)=>{
                const payload = ticket.getPayload();
                // console.log(payload)
                email = payload.email
                return User.findOne({where: {email}})
            })
            .then(user=>{
                if(user){
                    const token = generateToken({
                        id: user.id,
                        email: user.email
                    })
                    res.status(201).json({access_token: token })
                }else{
                    return User.create({
                        email,
                        password: 'whatever'
                    })
                }
            })
            .then(registerUser=>{
                const token = generateToken({
                    id: registerUser.id,
                    email: registerUser.email
                })
                res.status(201).json({access_token: token })
            })
            .catch(err=>{
                console.log(err)
            })
            
    }
}

module.exports = ControllerUser