const { User } = require('../models/')
const { checkPass } = require('../helpers/bcrypt')
const { generateJwt } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email
        })
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
      .then(data => {
        if (!data) throw { error: 'Invalid Email or Password', status: 400 }
        const checkPwd = checkPass(password, data.password)
        if (!checkPwd) throw { error: 'Invalid Email or Password', status: 400 }
        const access_token = generateJwt({
          id: data.id,
          email: data.email
        })
        res.status(200).json({ access_token })
      })
      .catch(err => {
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
          const access_token = generateJwt({
            id: data.id,
            email: data.email
          })
          res.status(200).json({ access_token })
        } else {
          return User.create({ email, password })
        }
      })
      .then(user => {
        const access_token = generateJwt({
          id: user.id,
          email: user.email
        })
        res.status(201).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController