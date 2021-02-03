const { comparePassword } = require('../helper/bcrypt')
const { User } = require('../models')
const { generateToken } = require('../helper/jwt')

class UserController {
  static register(req, res){
    const { username, email, password } = req.body

    User.create({ username, email, password })
    .then(data => res.status(201).json(data))
    .catch(err => next(err))
  }

  static login (req, res, next){
    const { username, password } = req.body
    User.findOne({
      where: { username }
    })
    .then(data => {
      if (!data) throw { status: 400, msg: "Invalid email or password" }
      const compare = comparePassword(password, data.password)
      if (!compare){
        throw { status: 400, msg: "Invalid email or password2" }
      }
      const access_token = generateToken({
        id: data.id,
        username: data.username,
        email: data.email
      })
      res.status(200).json({ access_token })
    })
    .catch(err => next(err))
  }
}

module.exports = UserController