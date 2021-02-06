const User = require('../models/index').User
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController{
  static register (req, res, next){
    let { email , password } = req.body 
    User.create({email, password})
    .then(newUser => {
      console.log(newUser)
      let {email, id} = newUser
      res.status(201).json({email, id})
    })
    .catch(err => {
      console.log(err.name, 'ini dalem userController')
      // if(err.name == "SequelizeValidationError"){
      //   return res.status(400).json(err.message)
      // } else if(err.name == "SequelizeUniqueConstraintError"){
      //   return res.status(400).json({msg: 'Email already exists'})
      // }
      // res.status(500).json({msg : 'internal server error'})
      next(err)
    })
  }
  static async login(req, res, next){
    try {
      let {email, password} = req.body
      let user = await User.findOne({
        where: {email}
      })
      if(!user){
        // return res.status(401).json({msg: 'Invalid email'})
        throw {
          name: 'InvalidEmail',
          status: 401,
          msg: 'Invalid Email'
        }

      }
      let isMatch = comparePassword(password, user.password)
      if(!isMatch){
        // return res.status(401).json({msg: 'Invalid password'})
        throw {
          name: 'InvalidPassword',
          status: 401,
          msg: 'Invalid Password'
        }
      }
      const payload = {
        id: user.id,
        email: user.email
      }
      const access_token = generateToken(payload)
      res.status(200).json(access_token)

    } catch (err) {
      // console.log(err)
      // res.status(500).json({msg: 'Internal Server Error'})
      next(err)
    }
  }

  static loginGoogle(req, res, next){
    let {id_token} = req.body
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ''
    let password = ''
    console.log(client, '<<<< ini client')
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      email = payload.email
      password = 'randomPassword'
      //findOne by email dulu buat cek emailnya udah ada atau belum. kalo blm ada, dibikin dulu. kalo udah ada, lanjut login
      return User.findOne({
        where: {email}
      })
    })
    .then(user => {
      if (user){
        console.log('masuk if then kedua')
        return user
      } else{
        console.log('masuk else then kedua')
        return User.create({
          email,
          password
        })
      }
    })
    .then(user => {
      const {id, email} = user
      const payload = {
        id,
        email
      }
      const access_token = generateToken(payload)
      console.log(access_token, 'ini access token')
      res.status(200).json(access_token)
    })
    .catch(err => {
      res.status(500).json({msg: 'internal server error'})
    })
  }
}

module.exports = UserController