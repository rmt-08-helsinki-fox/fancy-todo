const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const axios = require('axios')

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
    const {email, password} = req.body
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
}

module.exports = UserController