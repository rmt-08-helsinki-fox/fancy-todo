const { User } = require('../models')
const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class UserController {
  // User Register
  static register(req, res) {
    const objUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(objUser)
      .then(user => {
        res.status(201).json({
          msg: 'Register Succes',
          id: user.id,
          email: user.email,
          password: user.password
        })
      })
      .catch(err => {
        // const error = err.errors[0].message || `Internal server error`
        const messages = {}
        if (err.errors.length > 0) {
          err.errors.forEach(element => {
              if (messages.message == undefined) {
                  messages.message = []
              }
              messages.message.push(element.message)
          })
          res.status(400).json(messages)
        }
      })
  }
  // User Login
  static login(req, res) {
    // const { email, password } = req.body
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
}

module.exports = UserController