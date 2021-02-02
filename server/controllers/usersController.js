const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { User } = require('../models')
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

            if(user){
                const comparedPassword = comparePassword(req.body.password, user.password)
                if(comparedPassword){
                    // console.log('MATCH');
                    
                    
                } else {
                    // console.log('NOT MATCH');
                }

            } else {
                throw {error: {
                    code: 404,
                    message: 'invalid email or password'
                }}
            }
        } catch (err) {
            
            res.send(err)
        }
    }


}

module.exports = UserController