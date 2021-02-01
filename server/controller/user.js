const { User } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')

class userController {
  static async register (req, res) {
    const { email, password } = req.body
    try {
      const create = await User.create({ email, password })
      console.log(create)
      res.status(201).json({
        id: create.id,
        email: create.email,
        password: create.password
      })
    } catch (err) {
      res.status(500).json({ msg: 'Internal server error' })
    }
  }
  static async login (req, res) {
    const { email, password } = req.body
    try {
      const find = await User.findOne({ where: { email }})
      const comparePass = comparePassword(password, find.password)
      if (!find || !comparePass) {
        res.status(400).json({
          msg: 'Email or Password is undefined'
        })
      } else {
        const token = {
          id: find.id,
          email: email,
        }
        const access_token = generateToken(token)
        res.status(200).json({ access_token })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ msg: 'Internal server error' })
    }
  }
}

module.exports = userController