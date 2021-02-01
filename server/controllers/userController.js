//@ts-check
// @ts-ignore
const { User } = require("../models")
const { hasPass, comparePass } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class UserController {
    static register(req, res) {
        const { email, password } = req.body
        const datum = {
            email: req.body.email,
            password: req.body.password,
        }
        User.create(datum)
            .then((user) => {
                res.status(201).json({
                    msg: `Register success`,
                    id: user.id,
                    email: user.email,
                    password: user.password,
                })
            })
            .catch((err) => {
                const error = err.console.error[0].message || `Internal server error`
                res.status(500).json({ error })
            })
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.finOne({
                where: {
                    email,
                },
            })
            if (!user) {
                throw { msg: `Invalid email or password` }
            }
            const comparedPassword = comparePass(password, hasPass(user.password))
            if (!comparedPassword) {
                throw {
                    msg: `Invalid email or password`,
                    status: 400,
                }
            }
            const accessToken = generateToken({
                id: user.id,
                email: user.email,
            })
            res.status(200).json({ accessToken })
        } catch (err) {
            const error = err.msg || `Internal server error`
            const status = err.status || 500
            res.status(status).json({ error })
        }
    }
}

module.exports = UserController
