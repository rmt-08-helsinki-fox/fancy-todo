const { User } = require('../models')
const { compareText } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');

class UserController {

  static register(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
    .then( data => {
      res.status(201).json({
        message: "register success!",
        data: {
          id: data.id,
          email: data.email
        }
      })
    })
    .catch( err => {
      next(err)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: { email }
    })
    .then( data => {
      const isValid = compareText(password, data.password)
      if (isValid) {
        res.status(200).json({
          access_token: jwt.sign({ id: data.id, email: data.email }, process.env.SECRET_KEY),
        })
      } else {
        next({ error: 'invalid email or password', code: 401 })
      }
    })
    .catch( err => {
      next(err)
    })
  }

  static loginWithGoogle(req, res, next) {
    const google_token = req.params.google_token;
    const client = new OAuth2Client(process.env.G_CLIENT_ID);
    let email = ''
    client.verifyIdToken({
      idToken: google_token,
      audience: process.env.G_CLIENT_ID, 
    })
    .then( ticket => {
      const payload = ticket.getPayload()
      email = payload.email
      return  User.findOne({where: { email }})
    })
    .then( user => {
      if (user) {
        res.status(200).json({
          access_token: jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY),
        })
      } else {
        return User.create({ email, password: process.env.PSWD })
      }
    })
    .then( data => {
      res.status(201).json({
        message: "register success!",
        data: {
          id: data.id,
          email: data.email
        }
      })
    })
    .catch( err => {
      next(err)
    })
  }

}

module.exports = UserController