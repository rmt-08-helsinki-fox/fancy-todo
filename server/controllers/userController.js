const { User } = require('../models/')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {

  static register(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
     next(err)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const options = {
      where: {
        email
      }
    }
    User.findOne(options)
    .then((user) => {
      if (!user) throw { status: 400, msg: 'Invalid email or password' }
      
      const comparedPassword = comparePass(password, user.password)
      if (!comparedPassword) throw { status: 400, msg: 'Invalid email or password' }

      const accessToken = generateToken({
        id: user.id,
        email: user.email
      })
      
      res.status(200).json({ accessToken })
    })
    .catch((err) => {
      next(err)
    })
  }

}

module.exports = UserController