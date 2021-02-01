const { user } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register (req, res, next) {
    let newUser = {
      fullName: req.body.fullname,
      email: req.body.email,
      password: req.body.password
    }
    user.create(newUser)
      .then(dataUser => {
        res.status(201).json(dataUser)
      })
      .catch( err => {
        next(err)
      })
  }

  static login (req, res, next) {
    let dataLogin = {
      email: req.body.email,
      password: req.body.password
    }
    user.findOne({where: {
      email: dataLogin.email
      }
    })
      .then(dataUser => {
        if(dataUser) {
          let matchPass = comparePassword(dataLogin.password, dataUser.password)
          if (matchPass) {
            let payload = {
              id: dataUser.id,
              email: dataUser.email
            }
            let access_token = generateToken(payload)
            res.status(200).json({access_token})
          }else {
            next({name: 'JsonWebTokenError', message: 'Invalid Email or Password'})
          }
        } else {
          next({name: 'NotFoundError', message: 'Invalid Email or Password'})
        }
      })
      .catch( err => {
        next(err)
      })
  }

}

module.exports = UserController