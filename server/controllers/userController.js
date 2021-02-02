const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(input)
      .then(user => {
        const response = {
          id: user.id,
          email: user.email
        }

        res.status(201).json(response)
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  }
  
  static login(req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      where: {
        email: input.email
      }
    })
      .then(user => {
        if (!user) {
          res.status(401).json({
            message: 'Invalid email or password'
          })
        }

        const match = checkPassword(input.password, user.password)

        if (match) {
          const payload = {
            id: user.id,
            email: user.email
          }

          const access_token = generateToken(payload)

          res.status(200).json({
            access_token
          })
        } else {
          res.status(401).json({
            message: 'Invalid email or password'
          })
        }
      })
      .catch(err => {
        res.status(401).json({
          message: err
        })
      })
  }

  static loginGoogle(req, res, next) {}
}

module.exports = UserController;