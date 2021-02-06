const { User } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const { full_name, email, password, city } = req.body
        User.create({ full_name, email, password, city })
            .then(user => {
                res.status(201).json({ msg: 'Register Success', id: user.id, full_name: user.full_name, email: user.email, city: user.city })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (!user) throw { name: 'ClientError', msg: 'Invalid email or password!', status: 400 }
                const comparedPassword = comparePass(password, user.password)
                if (!comparedPassword) throw { name: 'ClientError', msg: 'Invalid email or password!', status: 400 }
                const access_token = generateToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({ access_token })
            })
            .catch(err => {
                next(err)
            })
    }

    static logInWithGoogle(req, res, next) {

    }
}

module.exports = UserController