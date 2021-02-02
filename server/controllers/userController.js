const { Todo, User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

module.exports = class UserController {

  static async register(req, res, next) {
    try {
      let { email, password } = req.body;
      const registeredUser = await User.create({ email, password }, { returning: true })
      let { id } = registeredUser;
      res.status(201).json({ id, email })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      const user = await User.findOne({ where: { email } })
      if(!user) { throw { name: "Bad Request", message: "email or password incorrect", status: 400 } }
      let isPassword = comparePassword(password, user.password)
      if(!isPassword) { throw { name: "Bad Request", message: "email or password incorrect", status: 400 } }
      const access_token = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({ access_token })
    } catch (err) {
      next(err)
    }
  }
}