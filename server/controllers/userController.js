//@ts-check
// @ts-ignore
const { User } = require("../models")
const { hashPass, comparePass } = require("../helpers/bcrypt")
const { generateToken, decoded } = require("../helpers/jwt")

class UserController {
    // ? 1. Post /register => 201, 400
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.create({ email, password })
            if (user) {
                res.status(201).json({
                    msg: `Register success`,
                    id: user.id,
                    email: user.email,
                })
            } else {
                next({ status: 400 })
            }
        } catch (err) {
            next(err)
        }
    }
    // ? 2. Post /login => 200, 400
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email },
            })
            if (!user) {
                next({
                    status: 400,
                    msg: `Invalid email or password`,
                })
            }
            const comparedPassword = comparePass(password, hashPass(user.password))
            if (!comparedPassword) {
                next({
                    status: 400,
                    msg: `Invalid email or password`,
                })
            }
            const accessToken = generateToken({
                id: user.id,
                email: user.email,
            })
            res.status(200).json({
                accessToken,
                msg: "Access Token required",
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
