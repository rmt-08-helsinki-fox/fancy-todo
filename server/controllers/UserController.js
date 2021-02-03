const { User, Todo } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/genToken')

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
}


module.exports = UserController