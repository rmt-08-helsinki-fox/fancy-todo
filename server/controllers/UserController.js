const { User, Todo } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static showAllUsers(req, res){
    User.findAll()
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static register(req, res){
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
        const error = err.errors[0].message || "Internal Server Error"
        
        res.status(500).json({ error })
      })
  }

  static login(req, res){
    const { email, password } = req.body

    User.findOne({ 
      where: { 
        email 
      } 
    })
      .then(user => {
        if (!user) throw { msg: "Invalid email or password" }
        const comparedpass = comparePass(password, user.password)
        if (!comparedpass) throw { msg: "Invalid email or password" }
        const accessToken = generateToken({
          id: user.id,
          email: user.email
        })

        res.status(200).json({ accessToken })
      })
      .catch(err => {
        const error = err.msg || "Internal Server Error"

        res.status(500).json({ error })
      })
  }

  static showUserByUsername(req, res){
    User.findOne({
      where: {
        username: req.params.username
      }
    })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}


module.exports = UserController