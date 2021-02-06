const { User, Todo } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const generateToken = require('../helpers/genToken')
const googleUsername = require('../helpers/googleUsername')
const generateRandomPassword = require('../helpers/generateRandomPssword')
const {OAuth2Client} = require('google-auth-library')

class UserController {
  static showAllUsers(req, res, next){
    User.findAll()
      .then(user => {
        if(user.length === 0) throw {
          name: "customError",
          msg: "Data not found",
          code: 404
          }
        res.status(200).json(user)
      })
      .catch(err => {
        next(err)
      })
  }

  static register(req, res, next){
    const { name, username, email, password } = req.body

    User.create({ name, username, email, password })
      .then(user => {
        res.status(201).json({
          msg: "Register success",
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next){
    const { email, password } = req.body

    User.findOne({ 
      where: { 
        email 
      } 
    })
      .then(user => {
        if (!user) throw {
          name: "customError",
          msg: "Invalid email or password",
          code: 400
        }
        const comparedpass = comparePass(password, user.password)
        if (!comparedpass) throw { 
          name: "customError",
          msg: "Invalid email or password",
          code: 400
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

  static showUserByUsername(req, res, next){
    User.findOne({
      where: {
        username: req.params.username
      }
    })
      .then(user => {
        if(user === null) throw {
          name: "customError",
          msg: "Data is null",
          code: 404
          }
        res.status(200).json(user)
      })
      .catch(err => {
        next(err)
      })
  }

  static googleLogin(req, res, next){
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let name = ''
    let email = ''
    let username = ''
    const password = generateRandomPassword()

    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      console.log('masuk ticket')
      const payload = ticket.getPayload()
      name = payload.name
      email = payload.email
      username = googleUsername(payload.email)

      return User.findOne({ where: {email} })
    })
    .then(user => {
      if (user){
        const accessToken = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ accessToken })
      }else {
        return User.create({
          name,
          email,
          username,
          password
        })
      }
    })
    .then(userCreate => {
      const accessToken = generateToken({
        id: userCreate.id,
        email: userCreate.email
      })
      res.status(201).json({ accessToken })
    })
    .catch(err => {
      next(err)
    })
  }
}


module.exports = UserController