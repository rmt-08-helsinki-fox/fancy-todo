const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{

  static register(req,res){

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
        res.status(500).json(err)
      })

  }

  static login(req,res){

    const { email, password } = req.body

    User.findOne({
      where:{
        email: email
      }
    })
    .then( user => {

      if(!user) throw { message: 'Invalid email or password' }
      const comparedPass = comparePassword(password,user.password)
      if(!comparedPass) throw { message: 'Invalid email or password' }
      
      const accessToken = generateToken({
        id: user.id,
        email: user.email,
      })

      res.status(200).json({ accessToken })

    })
    .catch( err => {
      res.status(500).json(err)
    })


  }


}

module.exports = UserController