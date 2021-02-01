const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
  //============== register ===========
  static register(req, res) {
    const {email, password} = req.body
    User.create({
      email,
      password
    })
      .then(User => {
        res.status(201).json(User)
      })
      .catch(err => {
        console.log(err)
        if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
          res.status(400).json(err.errors[0])
        } else {
          res.status(500).json(err)
        }
      })
  }

  // ============= login ===========
  static login(req, res) {
    const {email, password} = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if(!user) throw {msg: 'invalid email or password'}
        const checkPassword = comparePass(password, user.password)
        if(!checkPassword) throw {msg: 'invalid email or password'}
        const getToken = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({getToken})
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = UserController