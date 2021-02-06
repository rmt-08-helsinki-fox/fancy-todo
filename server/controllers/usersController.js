const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { User } = require('../models')
const { getAccessToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static async signUp(req, res, next) {
        try {
            const { email, name, password } = req.body
            const newUser = await User.create({
                email,
                name,
                password
            })
            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    static async signIn(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (user) {
                const comparedPassword = comparePassword(req.body.password, user.password)
                if (comparedPassword) {
                    const accessToken = getAccessToken({
                        id: user.id,
                        email: user.email
                    })
                    res.status(200).json({ accessToken })
                } else {
                    throw {
                        name: 'Custom error',
                        error: {
                            code: 400,
                            message: 'invalid email or password'
                        }
                    }
                }
            } else {
                throw {
                    name: 'Custom error',
                    error: {
                        code: 400,
                        message: 'invalid email or password'
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }


    static async signinGoogle(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.GSIGNIN_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GSIGNIN_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const {email, name} = payload
            
            const user = await User.findOne({where: {email}})
            
            if(!user){
                let newUser = await User.create({
                    email, name, password: process.env.GSIGNIN_PASS_GEN
                })
                
                const accessToken = getAccessToken({
                    id: newUser.id,
                    email: newUser.email
                })
                res.status(201).json(accessToken)
            } else {
                const accessToken = getAccessToken({
                    id: user.id,
                    email: user.email
                })
                
                res.status(200).json({accessToken})
            }
            

        } catch (error){
            next(error)
        }


    }
}

module.exports = UserController