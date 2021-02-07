const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt') 
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static register(req, res, next) {
        const {email, password} = req.body
        const value = {
            email,
            password
        }
        User.create(value)
        .then(data => res.status(201).json({
            msg: `Register success`,
            id: data.id,
            email: data.email
        }))
        .catch(err => {
            // console.log(err.name);
            if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
                next({
                    status: 400,
                    errors: err.errors
                })
            } else next(err)
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body
        User.findOne({
            where: {email}
        })
        .then(data => {
            if(!data) throw {msg: `Invalid email / password`}
            const comparedPass = compare(password, data.password)
            if(!comparedPass) throw {msg: `Invalid email / password`}
            // console.log(data, '<<<<<<');
            const access_token = generateToken({
              id: data.id,
              email: data.email
            })
            res.status(200).json({ access_token })
        })
        .catch(err => {
            const error = err.msg || `Internal server error`
            res.status(500).json({ error })
        })

    }

    static googleLogin(req, res, next) {
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.GOOGLE_KEY)
        let email
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_KEY
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            email = payload.email
            return User.findOne({
                where: {
                    email
                }
            })
        })
        .then(data => {
            if(!data) {
                return User.create({
                    email,
                    password: process.env.PASSWORD
                })
            } else return data
        })
        .then(data => {
            const access_token = generateToken({
                id: data.id,
                email: data.email
            })
            res.status(200).json({ access_token })
        })
        .catch(err => next(err))
    }
}

module.exports = UserController