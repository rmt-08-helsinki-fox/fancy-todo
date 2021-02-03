const { User } = require('../models/')
const { checkPass } = require('../helpers/bcrypt')
const { generateJwt } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if (!data) throw { error: 'Invalid Email or Password', status: 400 }
        const checkPwd = checkPass(password, data.password)
        if (!checkPwd) throw { error: 'Invalid Email or Password', status: 400 }
        const access_token = generateJwt({
          id: data.id,
          email: data.email
        })
        res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController