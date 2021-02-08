const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = process.env.CLIENT_ID

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body
    const dataUser = { name, email, password }
    User.create(dataUser)
    .then(user => {
      res.status(200).json({
        message: 'Register success',
        name: user.name,
        email: user.email
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const dataUser = { email, password }
    User.findOne({
      where: {
        email: dataUser.email
      }
    })
    .then(user => {
      if (!user) {
        throw { msg: 'Invalid email or password' }
      }
      const comparedPassword = comparePassword(password, user.password)
      if (!comparedPassword) {
        throw { msg: 'Invalid email or password' }
      }
      const accessToken = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({ accessToken })
    })
    .catch(err => {
      next(err)
    })
  }

  static googleLogin(req, res, next) {
    const idToken = req.body.idToken
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email
    client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        email = payload.email
        return User.findOne({ where: { email: email }})
      })
      .then(user => {
        if (user) {
          let payload = {
            id: user.dataValues.id,
            email: user.dataValues.email
          }
          const access_token = generateToken(payload)
          req.headers.access_token = access_token
          res.status(200).json({ access_token })
        } else {
          let password = process.env.PASSWORD_FILLER
          return User.create({ email, password })
        }
      })
      .then(user => {
        if (user) {
          let payload = {
            id: user.id,
            email: user.id
          }
          const access_token = generateToken(payload)
          req.headers.access_token = access_token
          res.status(201).json({ access_token })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController;