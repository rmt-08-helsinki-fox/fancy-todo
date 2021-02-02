const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateJwt } = require('../helpers/jwt')

class Controller {
  static async register(req, res, next) {
    try {
      let {email, password} = req.body
      let user = await User.create({email, password})
      let out = {
        id: user.id,
        email: user.email
      }
      res.status(201).json(out)
    } catch (err) {
      if (!err.name) next(err)
      next({status: 400, errors: err.errors})
    }
  }

  static async login(req, res, next) {
    try {
      let {email, password} = req.body
      let user = await User.findOne({
        where: {
          email
        }
      })
      if (!user || !comparePass(password,user.password)) throw ({ status: 401, msg: 'invalid email / password'})
      let payload = {
        id : user.id,
        email : user.email
      }
      let jwt = generateJwt(payload)
      res.status(200).json({ access_token: jwt})
    } catch (err) {
      if (!err.msg) next(err)
      next(err)
    }
  }
}

module.exports = Controller