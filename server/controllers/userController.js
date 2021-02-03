const { User } = require('../models')
const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController {
  // User Register
  static register(req, res, next) {
    const objUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(objUser)
      .then(user => {
        res.status(201).json({
          msg: 'Register Succes',
          id: user.id,
          email: user.email
        })
      })
      .catch(err => {
        const message = err.errors.map(element => element.message)
        const error = { name: err.name, statusCode: 400, msg: message}
        next(error)
      })
  }
  // User Login
  static login(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) throw { msg: `Invalid email or password` }
        const comparePassword = compare(req.body.password, user.password)
        if(!comparePassword) throw { msg: `Invalid email or password` }

        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        console.log(access_token)
        res.status(200).json({ access_token })
      })
      .catch(err => {
        const error = err.msg || `Internal server error`
        res.status(400).json(error)
      })
  }
  // google login
  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = ""
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
      .then((ticket) => {
        const payload = ticket.getPayload()
        email = payload.email
        // console.log(payload)
        return User.findOne({
          where: {
            email
          }
        })
      })
      .then(user => {
        if (user) {
          //generate token
          const token = generateToken({
            id: user.id,
            email: user.email
          })
          res.status(200).json({ access_token:token })
        } else {
          return User.create({
            email,
            password: process.env.USER_PWD_GOOGLE
          })
        }
      })
      .then(registeredUser => {
        const token = generateToken({
          id: registeredUser.id,
          email: registeredUser.email
        })
        res.status(201).json({ access_token:token })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = UserController