const { User } = require('../models')

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
        const error = err.errors[0].message || `Internal server error`
        res.status(500).json(error)
      })
  }
  // User Login
  static login(req, res) {

  }
}

module.exports = UserController