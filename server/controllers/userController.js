const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

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
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let name;
    let email;
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
    .then(tiket => {
      const payload = tiket.getPayload()
      name = payload.name
      email = payload.email
      return User.findOne({
        where: {
          email
        }
      })
    })
    .then(user => {
      if (!user) {
        return User.create({
          name,
          email,
          password: process.env.DEFAULT_PASSWORD
        })
      } else {
        return user
      }
    })
    .then(user => {
      let accessToken = generateToken({
        id: user.id,
        name: user.name,
        email: user.email
      })
      res.status(201).json({
        name: user.name,
        email: user.email,
        accessToken
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController;