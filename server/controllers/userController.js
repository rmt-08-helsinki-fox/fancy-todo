const { User } = require('../models/index.js')
const { comparePassword } = require('../helpers/bcrypt.js')
const { createToken } = require('../helpers/jwt.js')
const { OAuth2Client } = require('google-auth-library');

class Controller {
  static postSignUp(req, res, next) {
    let inputData = {
      email: req.body.email,
      password: req.body.password
    }
    User
      .create(inputData)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static postSignIn(req, res, next) {
    let inputData = {
      email: req.body.email,
      password: req.body.password
    }
    User
      .findOne({
        where: {
          email: inputData.email
        }
      })
      .then((data) => {
        if (!data) throw { name: 'customError', msg: 'Invalid email or password' }
        let comparePass = comparePassword(inputData.password, data.password)
        if (!comparePass) throw { name: 'customError', msg: 'Invalid email or password' }
        let accessToken = createToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({ accessToken })
      })
      .catch((err) => {
        next(err)
      })
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const googleToken = req.body.googleToken;
    let email = ''
    const password = process.env.PASSWORD_GOOGLE_ACCOUNT

    client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.CLIENT_ID
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
        if (data) {
          let accessToken = createToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({ accessToken })
        } else {
          return User.create({ email, password })
        }
      })
      .then(user => {
        let accessToken = createToken({
          id: user.id,
          email: user.email
        })
        res.status(201).json({ accessToken })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Controller