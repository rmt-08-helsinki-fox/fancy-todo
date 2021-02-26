const { User } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
  static register(req, res, next) {
    const { full_name, email, password} = req.body
    User.create({ full_name, email, password })
      .then(user => {
        res.status(201).json({ msg: 'Register Success', id: user.id, full_name: user.full_name, email: user.email})
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
      .then(user => {
        if (!user) throw { name: 'ClientError', msg: 'Invalid email or password!', status: 400 }
        const comparedPassword = comparePass(password, user.password)
        if (!comparedPassword) throw { name: 'ClientError', msg: 'Invalid email or password!', status: 400 }
        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }

  static logInWithGoogle(req, res, next) {
    let { id_token } = req.body
    const client = new OAuth2Client('518497281687-7d52gen9n0ki66ekm1v1mcmatlp964aa.apps.googleusercontent.com')

    let payload = null
    client.verifyIdToken({
      idToken: id_token,
      audience: '518497281687-7d52gen9n0ki66ekm1v1mcmatlp964aa.apps.googleusercontent.com'
    })
      .then(ticket => {
        payload = ticket.getPayload()
        return User.findOne({ where: { email: payload.email } })
      })
      .then(user => {
        if (!user) {
          return User.create({
            email: payload.email,
            name: payload.name,
            password: Math.floor(Math.random() * 1000) + 'fromgoogle'
          })
        } else {
          return user
        }
      })
      .then(user => {
        let googleSign = {
          id: user.id,
          email: user.email
        }
        let access_token = generateToken(googleSign)
        return res.status(200).json({
          token: access_token
        })
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = UserController