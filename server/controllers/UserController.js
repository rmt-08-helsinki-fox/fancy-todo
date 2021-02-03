const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
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
        next(err)
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email: email
      }
    })
      .then(user => {
        const customError = { name: "INVALID_EMAIL_OR_PASSWORD"}
        if (!user) throw customError
        const comparePass = comparePassword(password, user.password)
        if (!comparePass) throw customError
        const token = generateToken({
          id: user.id,
          email: user.email,
          name: user.name
        })
        console.log(token)
        res.status(200).json({ token })
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = UserController