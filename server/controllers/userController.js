const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static userRegister(req ,res, next) {
    const { email, password } = req.body
    const newUser = {
      email,
      password
    }
    User.create(newUser)
    .then(user => {
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static userLogin(req ,res, next) {
    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if(!user) {
        throw { 
          name: "customError",
          msg: 'Invalid email or password'}
      }

      const validate = compare(password, user.password)

      if(!validate) {
        throw { 
          name: "customError",
          msg: 'Invalid email or password'}
      }
      
      const access_token = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({ access_token })
    })
    .catch(err => {
      next(err)
    })

  }
}

module.exports = UserController