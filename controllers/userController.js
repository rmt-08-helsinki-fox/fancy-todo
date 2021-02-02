const { User } = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
  static async signUp(req, res, next) {
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
      next(error)
    }
  }

  static async signIn(req, res, next) {
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
          throw {name : 'CustomError', msg: 'Email or password is wrong', status: 400}
        }
      } else {
        throw {name : 'CustomError', msg: 'Email or password is wrong', status: 400}
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController