const { User } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')

class userController {
  static async register (req, res, next) {
    const { email, password } = req.body
    try {
      const create = await User.create({ email, password })
      res.status(201).json({
        id: create.id,
        email: create.email,
      })
    } catch (err) {
      next(err)
    }
  }
  static async login (req, res, next) {
    const { email, password } = req.body
    try {
      const find = await User.findOne({ where: { email }})
      // console.log(password)
      if (!find) {
        throw {
          name: 'invalidLogin'
        }
      } else {
        const comparePass = comparePassword(password, find.password)
        if (comparePass) {

          const token = {
            id: find.id,
            email: find.email,
          }
          const access_token = generateToken(token)
          res.status(200).json({ access_token })
        } else {
          throw {
            name: 'invalidLogin'
          }
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController