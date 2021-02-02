const { User } = require("../models")
const { comparePass } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

module.exports = class UserController {
  static register(req, res) {
    const { email, password } = req.body

    User.create({ email, password }, { returning: true })
      .then(newUser => {
        res.status(201).json({ id: newUser.id, email: newUser.email })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static login(req, res) {
    const { email, password } = req.body

    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          throw { msg: "Invalid Email or password" }
        }
        const comparedPass = comparePass(password, user.password)
        if (!comparedPass) {
          throw { msg: "Invalid Email or password" }
        }
        const accessToken = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ accessToken })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}