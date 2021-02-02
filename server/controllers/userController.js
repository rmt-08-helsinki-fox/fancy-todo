const { User } = require("../models/index")
const { comparePass } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt")

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
}

module.exports = UserController