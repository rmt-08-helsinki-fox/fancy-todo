const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { User } = require('../models')
const { getToken } = require('../helpers/jwt')
class UserController {
    static async signUp(req, res) {
        try {
            const { email, password } = req.body
            const newUser = await User.create({
                email, password: hashPassword(password)
            })
            res.status(201).json(newUser)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    static async signIn(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (user) {
                const comparedPassword = comparePassword(req.body.password, user.password)
                if (comparedPassword) {
                    // console.log('MATCH');
                    const token = getToken({
                        id: user.id,
                        email: user.email
                    })
                    res.status(200).json({ token })

                } else  {
                    // console.log('NOT MATCH');
                    throw {
                        error: {
                            code: 404,
                            message: 'invalid email or password'
                        }

                    }
                }

            } else {
                throw {
                    error: {
                        code: 404,
                        message: 'invalid email or password'
                    }
                }
            }
        } catch (error) {

            res.status(404).json(error)
        }
    }


}

module.exports = UserController