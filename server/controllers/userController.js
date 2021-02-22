const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');


class UserController {
  static userSignup(req ,res, next) {
    const { email, password } = req.body
    const newUser = {
      email,
      password
    }
    User.create(newUser)
    .then(user => {
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static userSignin(req ,res, next) {
    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if(!user) {
        throw { 
          name: "customError",
          msg: 'Invalid email or password'}
      }

      const validate = compare(password, user.password)

      if(!validate) {
        throw { 
          name: "customError",
          msg: 'Invalid email or password'}
      }
      
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

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email;

    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID,
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
    .then(user => {
      if(user) {
      const access_token = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({access_token})
      } else {
        return User.create({
          email,
          password: process.env.PWD
        })
      }
    })
    .then(registeredUser => {
      const access_token = generateToken({
        id: registeredUser.id,
        email: registeredUser.email
      })
      res.status(201).json({access_token})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController