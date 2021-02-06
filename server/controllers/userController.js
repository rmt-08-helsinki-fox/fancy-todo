const { User } = require("../models")
const { checkPassword } = require("../helpers/bycript")
const { generateToken } = require("../helpers/jwt")

class Controller {
  static register(req, res, next) {
    let { email, password } = req.body
    User.create({
      email, 
      password
    }).then(user => {
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    }).catch(err => {
      next(err)
    })
  }
  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    }).then(user => {
      if (!user) throw {name: "invalidError", message: "Invalid email or password"}
      let checkPwd = checkPassword(password, user.password)
      if (!checkPwd) throw {name: "invalidError", message: "Invalid email or password"}
      const accessToken = generateToken({ id: user.id, email: user.email })
      res.status(200).json({ accessToken })
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = Controller