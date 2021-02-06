const { User } = require("../models/index")
const { comparePass } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt")
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static async register (req, res, next) {
        try {
            const { email, password } = req.body;
            const newUser = {
                email,
                password
            }
                
            const user = await User.create(newUser)
            let payload  = {
                id:user.id,
                email:user.email
            }
            res.status(201).json(payload)
        } catch(err) {
            next(err)
        }
    }
    
    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            const findUser = await User.findOne({
                where: {
                    email
                }
            })
            if (!findUser) {
                throw {name: 'LoginError', message: 'Invalid email or password'}
            } else {
                const result = comparePass(password, findUser.password)
                if (!result) {
                    throw {name: 'LoginError', message: 'Invalid email or password'}
                } else {
                    let payload  = {
                        id:findUser.id,
                        email:findUser.email
                    }
                    const token = generateToken(payload)
                    res.status(200).json({access_token: token})
                }
            }
        } catch(err) {
            next(err)
        }
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ""
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            console.log(payload)
            email = payload.email

            return User.findOne({
                where: {
                    email
                }
            })
        })

        .then(user => {
            if(user) {
                const token = generateToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({access_token: token})
            } else {
                return User.create({
                    email,
                    password: process.env.USER_PWD_GOOGLE 
                })
            }
        })

        .then(registeredUser => {
            const token = generateToken({
                id: registeredUser.id,
                email: registeredUser.email
            })
            res.status(201).json({access_token: token})
        })

        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController