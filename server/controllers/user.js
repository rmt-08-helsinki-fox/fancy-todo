const { User } = require('../models')
const { compareText } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');

class UserController {

  static register(req, res) {
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
      next({ error: err.message, code: 500 })
    })
  }

  static login(req, res) {
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
      next({ error: err.message, code: 500 })
    })
  }

}

module.exports = UserController