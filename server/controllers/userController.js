const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');


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

  static googlLogin(req,res,next){
    let { id_token } = req.body
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    let payload = null

    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket =>{
      payload = ticket.getPayload()
      return User.findOne({
        where: {
          email: payload.email
        }
      })
    })
    .then(user =>{
      if(!user){
          return User.create({
              email: payload.email,
              fullName: payload.name,
              password: Math.floor(Math.random()*1000) + 'userDariGoogle'
          })
      } else{
          return user
      }
    })
    .then(user =>{
        let googleSign = {
            id: user.id,
            email: user.email
        }
        let accessToken = generateToken(googleSign)
        return res.status(201).json({
            access_token: accessToken
        })
    })
    .catch(err =>{
        next(err)
    })

  }


}

module.exports = UserController