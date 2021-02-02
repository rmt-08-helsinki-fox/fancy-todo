const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res) {
    const { role, email, password } = req.body
    const dataUser = { role, email, password }
    User.create(dataUser)
    .then(user => {
      res.status(200).json({
        message: 'Register success',
        email: user.email,
        role: user.role
      })
    })
    .catch(err => {
      const error = err.errors[0].message || 'Internal server error'
      res.status(500).json({ error })
    })
  }

  static login(req, res) {
    const { role, email, password } = req.body
    const dataUser = { role, email, password }
    User.findOne({
      where: {
        email: dataUser.email
      }
    })
    .then(user => {
      if (!user) {
        throw { msg: 'Invalid email or password' }
      }
      const comparedPassword = comparePassword(password, user.password)
      if (!comparedPassword) {
        throw { msg: 'Invalid email or password' }
      }
      const accessToken = generateToken({
        email: user.email,
        role: user.role
      })
      res.status(200).json({ accessToken })
    })
    .catch(err => {
      const error = err.msg || 'Internal server error'
      res.status(500).json({ error })
    })
  }
}

module.exports = UserController;