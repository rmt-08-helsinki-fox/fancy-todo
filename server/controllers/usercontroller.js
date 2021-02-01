const {User} = require("../models/")
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")


class UserController {
    static register (req, res) {
        const {email, password} = req.body
        const userData = {email, password}
        User.create(userData)
        .then(user => {
            res.status(201).json({
                id: user.id,
                email: user.email,
            })
        })
        .catch(err => {
            res.status(400).json({err})
        })
    }

    static login(req, res) {
        const {email, password} = req.body
        User.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            if (!user) throw `Invalid Email or password`
            const comparedPassword = comparePassword(password, user.password)
            if (!comparedPassword) throw `Invalid Email or password`
            const accessToken = generateToken({
                id: user.id,
                email: user.email
            })
            res.status(200).json({accessToken})
        })
        .catch(err => {
            res.status(400).json({err})
        })
    }
}

module.exports = UserController