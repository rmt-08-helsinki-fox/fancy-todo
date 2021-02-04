const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { User } = require('../models')
const { getAccessToken } = require('../helpers/jwt')
class UserController {
    static async signUp(req, res, next) {
        try {
            const { email, password } = req.body
            const newUser = await User.create({
                email, 
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
                } else  {
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
}

module.exports = UserController