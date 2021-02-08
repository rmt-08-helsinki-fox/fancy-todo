const { User } = require('../models')
const { checkPass } = require('../helpers/bcrypt')
const { generateToken } =require('../helpers/jsonwebtoken')
// const { checkToken } =require('../middleware/authentication')
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');

class UserController {
    // login
    // find email
    // compare password
    // jwt sign (npm install jsonwebtoken dulu)
    // jwt.sign(data = {}, secretKey = process.env.SECRETKEY)
    static register(req, res, next) {
        const {email, password} = req.body
        User.create({
            email,
            password
        }).then(function(data) {
            const { email } = data
            const newUser = {
                msg: 'Account created',
                email
            }
            res.status(201).json(newUser)
        }).catch(function(err) {
            // console.log(err);
            // res.status(400).json(err)
            next(err)
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body
        let access_token
        User.findOne({
            where: {
                email
            }
        }).then(function(user) {
            if (!user) {
                throw { msg: 'Invalid email or password'}
            } 
            const comparePsswrd = checkPass(password, user.password)
            if (!comparePsswrd) {
                throw {msg: 'Invalid email or password'}
            }
            access_token = generateToken({
                id: user.id,
                email: user.email
            })
            res.status(200).json({access_token})
        }).catch(function(err) {
            next(err)
        })
    }

    static quotes(req, res, next) {
        axios.get(
            'https://api.adviceslip.com/advice'
        ).then(response => {
            res.status(200).json(response.data.slip.advice)
        }).catch(err => {
            next(err)
        })
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.SECRET_OAUTH);
        const idToken = req.body.idToken
        let email
        client.verifyIdToken({
            idToken,
            audience: process.env.SECRET_OAUTH
        }).then(ticket => {
            const payload = ticket.getPayload()
            // console.log(payload, 'payload');
            email = payload.email
            return User.findOne({
                where: {
                    email: email
                }
            })
        }).then(user => {
            if (user) {
                let payload = {
                    id: user.dataValues.id,
                    email: user.dataValues.email
                }
                const access_token = generateToken(payload)
                req.headers.access_token = access_token
                // console.log(access_token);
                //user generate token
                // console.log(user, 'user controller');
                res.status(201).json({access_token})
            } else {
                let password = process.env.PASSWORD_GENERATE
                return User.create({
                    email,
                    password
                })
            }
        }).then(newUser => {
            if (newUser) {
                let payload = {
                    id: newUser.id,
                    email: newUser.email
                }
                const access_token = generateToken(payload)
                req.headers.access_token = access_token
                res.status(201).json({access_token})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController