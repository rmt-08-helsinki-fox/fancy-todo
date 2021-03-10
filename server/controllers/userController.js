//@ts-check
// @ts-ignore
const { User } = require("../models")
const { hashPass, comparePass } = require("../helpers/bcrypt")
const { generateToken, decoded } = require("../helpers/jwt")
const { OAuth2Client } = require("google-auth-library")

class UserController {
    // ? 1. Post /register => 201, 400
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.create({ email, password })
            res.status(201).json({
                msg: `Register success`,
                id: user.id,
                email: user.email,
            })
        } catch (err) {
            next(err)
        }
    }
    // ? 2. Post /login => 200, 400
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { status: 400, msg: `Invalid email or password` }
            }
            const comparedPassword = comparePass(password, user.password)
            if (!comparedPassword) {
                throw { status: 400, msg: `Invalid email or password` }
            }
            const accessToken = generateToken({
                id: user.id,
                email: user.email,
            })
            res.status(200).json({
                accessToken,
                msg: "Access Token granted",
            })
        } catch (err) {
            next(err)
        }
    }
    // ? GOOGLE LOGIN
    static async googleLogin(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE)
            const LoginTicket = await client.verifyIdToken({
                idToken: req.body.googleToken,
                audience: process.env.CLIENT_ID_GOOGLE,
            })
            const payload = LoginTicket.getPayload()
            const user = await User.findOne({ where: { email: payload.email } })
            // ? User exist
            if (user) {
                console.log(`User already exist`, user)
                const token = generateToken({
                    id: user.id,
                    email: user.email,
                })
                res.status(200).json({ accessToken: token })
                return
            }
            // ? User doesn't exist
            const newUser = await User.create({
                email: payload.email,
                password: process.env.PASSWORD_GOOGLE,
            })
            const token = generateToken({
                id: newUser.id,
                email: newUser.email,
            })
            res.status(201).json({ accessToken: token })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
