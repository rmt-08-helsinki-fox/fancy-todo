const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')

class Controller {

  static register (req, res, next) {
    let { email, password } = req.body
    User.create({ email, password })
      .then(user => {
        res.status(201).json({ id: user.id, email: user.email })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static login (req, res, next) {
    let { email, password } = req.body
    User.findOne({ where: { email: email }})
      .then(user => {
        if (user && comparePassword(password, user.password)) {
          const payload = {
            id: user.id,
            email: user.email
          }
          const access_token = generateToken(payload)
          req.headers.access_token = access_token
          res.status(200).json({ email: user.email, access_token })
        } else {
          throw ({ message: 'wrong username / password' })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  static googleLogin (req, res, next) {
    let email
    let statusCode
    const { id_token } = req.body
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(process.env.CLIENT_ID);
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        email = payload.email
        return User.findOne({ where: { email: email }})
      })
      .then(user => {
        if (!user) {
          const password = process.env.PASSWORD_FILLER
          statusCode = 201
          return User.create({ email, password })
        } else {
          statusCode = 200
          return user
        }
      })
      .then(user => {
        let payload = {
          id: user.id,
          email: user.id
        }
        const access_token = generateToken(payload)
        req.headers.access_token = access_token
        res.status(statusCode).json({ access_token, email: user.email })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = Controller