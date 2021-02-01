const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res) {
    const { email, password } = req.body
    const data = { email, password }
    User.create(data)
    .then(data => {
      res.status(200).json({
        msg: 'Register success',
        email: data.email
      })
    })
    .catch(err => {
      const error = err.errors[0].message || 'Internal server error'
      res.status(500).json({ error })
    })
  }

  static login(req, res) {
    // res.send('masuuk login')
    const { email, password } = req.body
    const data = { email, password }
    User.findOne({
      where: { email }
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
        email: user.email
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