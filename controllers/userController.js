const { User } = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
  static async signUp(req, res) {
    try {
      const { email, password } = req.body
      let newUser = await User.create({
        email,
        password
      })
      res.status(201).json({
        id: newUser.id,
        email: newUser.email
      })
    } catch (error) {
      let status = error.name = 'SequelizeValidationError' ? 400 : 500
      let err = error.errors[0].message || 'Internal server error'
      res.status(status).json({error : err})
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body
      let user = await User.findOne({
        where: {
          email
        }
      })
      if (user) {
        const comparedPassword = comparePassword(password, user.password)
        if (comparedPassword){
          const token = generateToken({
            id: user.id,
            email: email
          })
          res.status(200).json({token})
        } else {
          throw {msg: 'Email or password is wrong', status: 400}
        }
      } else {
        throw {msg: 'Email or password is wrong', status: 400}
      }
    } catch (error) {
      const status = error.status || 500
      const err = error.msg || 'Internal server error'
      res.status(status).json({error : err})
    }
  }
}

module.exports = UserController