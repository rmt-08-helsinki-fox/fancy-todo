const { User } = require('../models/')
const { checkPass } = require('../helpers/bcrypt')
const generateJwt = require('../helpers/jwt')

class UserController {
  static register(req, res) {
    const { email, password } = req.body
    User.create({ email, password })
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email
        })
      })
      .catch(err => {
        let error = 'Internal Server Error';
        let status = 500;
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
          error = []
          err.errors.forEach(element => {
            error.push(element.message)
          });
          status = 400
        }
        res.status(status).json({ error })
      })
  }
  static login(req, res) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if (!data) throw { error: 'Invalid email or password', status: 404 }
        const checkPwd = checkPass(password, data.password)
        if (!checkPwd) throw { error: 'Invalid email or password', status: 404 }
        const token = generateJwt({
          id: data.id,
          email: data.email
        })
        res.status(200).json({ token })
      })
      .catch(err => {
        const error = err.error || 'Internal server error'
        const status = err.status || 500
        res.status(status).json({ error })
      })
  }
}

module.exports = UserController