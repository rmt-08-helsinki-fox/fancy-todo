const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library')

class UserController{
  //============== register ===========
  static register(req, res, next) {
    const {email, password, location} = req.body
    User.create({
      email,
      password,
      location
    })
      .then(user => {
        axios.get(`http://api.weatherbit.io/v2.0/alerts?city=${user.location}&country=ID&key=${process.env.API_KEY}`)
        .then(wheater => {
          res.status(201).json({
            user,
            wheater: wheater.data
          })
        })
      })
      .catch(err => {
        next(err)
      })
  }

  // ============= login ===========
  static login(req, res, next) {
    const {email, password,} = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if(!user) throw {name:'invalid email or password', msg: 'invalid email or password'}
        const checkPassword = comparePass(password, user.password)
        if(!checkPassword) throw {name:'invalid email or password', msg: 'invalid email or password'}
        const getToken = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({getToken})
      })
      .catch(err => {
        next(err)
      })
  }

  // ============== google login ========
  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ''
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        console.log(payload)
        email = payload.email
        return User.findOne({ where: { email }})
      })
      .then(user => {
        if(user) {
          const getToken = generateToken({
            id: user.id,
            email: user.email
          })
          res.status(200).json({getToken})
        } else {
          return User.create({
            email,
            password: process.env.USER_PASSWORD_GOOGLE,
            location: 'Jakarta'
          })
        }
      })
      .then(registeredUser => {
        const getToken = generateToken({
          id: registeredUser.id,
          email: registeredUser.email
        })
        res.status(201).json({getToken})
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = UserController