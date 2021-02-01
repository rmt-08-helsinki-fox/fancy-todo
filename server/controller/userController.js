const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class Controller {

  static register (req, res, next) {
    let { email, password } = req.body
    User.create({ email, password })
      .then(user => {
        res.status(201).json({ id: user.id, email: user.email })
      })
      .catch(err => {
        console.log(err)
      })
  }

  static login (req, res, next) {
    let { email, password } = req.body
    User.findOne({ where: { email: email }})
      .then(user => {
        if (user && comparePassword(password, user.password)) {
          const payload = {
            id: user.id,
            email: user.email
          }
          const access_token = generateToken(payload)
          req.headers.access_token = access_token
          res.status(200).json({ access_token })
        } else {
          throw ({ message: 'wrong username / password' })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = Controller