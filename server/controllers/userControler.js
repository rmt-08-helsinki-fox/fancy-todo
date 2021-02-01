const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateJwt } = require('../helpers/jwt')

class Controller {
  static async register(req, res) {
    try {
      let {email, password} = req.body
      let user = await User.create({email, password})
      let out = {
        id: user.id,
        email: user.email
      }
      res.status(201).json(out)
    } catch (err) {
      let error = err.message || "internal server error"
      res.status(500).json(error)
    }
  }

  static async login(req, res) {
    try {
      let {email, password} = req.body
      let user = await User.findOne({
        where: {
          email
        }
      })
      if (!user || !comparePass(password,user.password)) throw ({ message: 'invalid email / password'})
      let payload = {
        id : user.id,
        email : user.email
      }
      let jwt = generateJwt(payload)
      res.status(200).json({ access_token: jwt})
    } catch (err) {
      let error = err.message || "internal server error"
      res.status(500).json(error)
    }
  }
}

module.exports = Controller