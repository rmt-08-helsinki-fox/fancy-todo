const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{

  static register(req, res, next){

    const {email, password} = req.body

    let newUser = {
      email,
      password
    }

    User.create(newUser)
      .then( user => {
        res.status(201).json({
          message: 'Register success',
          id: user.id,
          email: user.email,
        })
      })
      .catch( err => {
        err.from = 'userController - register'
        next(err)
      })

  }

  static login(req,res,next){

    const { email, password } = req.body

    User.findOne({
      where:{
        email: email
      }
    })
    .then( user => {

      if(!user) throw { name: 'customError', message: 'Invalid email or password', status: 400 }
      const comparedPass = comparePassword(password,user.password)
      if(!comparedPass) throw { name: 'customError', message: 'Invalid email or password', status: 400 }
      
      const accessToken = generateToken({
        id: user.id,
        email: user.email,
      })

      res.status(200).json({ accessToken })

    })
    .catch( err => {
      err.from = 'userController - login'
      next(err)
    })


  }


}

module.exports = UserController