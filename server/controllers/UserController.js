const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res) {
    const { email, password, name } = req.body
    User.create({
      email,
      password,
      name
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static login(req, res) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email: email
      }
    })
      .then(user => {
        if (!user) throw { msg: "Invalid email or password" }
        const comparePass = comparePassword(password, user.password)
        if (!comparePass) throw { msg: "Invalid email or password", status: 400 }
        const token = generateToken({
          id: user.id,
          email: user.email,
          name: user.name
        })
        res.status(200).json({ token })
      })
      .catch(err => {
        const error = err.msg || 'Internal server error'
        const status = err.status || 500
        res.status(500).json({ error })
      })
  }

}

module.exports = UserController