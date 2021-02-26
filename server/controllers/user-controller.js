const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt') 
const { getToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class ControllerUser {
  
  static register(req, res, next) {
    const { email, password } = req.body
    let obj = { email, password }
    User.create(obj)
    .then(user => {
      const { id, email } = user
      let obj = {id, email}
      res.status(201).json(obj)
    })
    .catch(err => {

      next(err)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if(!user) throw new Error('invalid email or password')
      if(!comparePassword(password, user.password)) throw new Error('invalid email or password')
      //jika berhasil login
      const access_token = getToken({
        id: user.id,
        email: user.email
        //pada saat authentication akan ada proses decoded
      })
      let id = user.id
      res.status(201).json({ access_token, id })
    })
    .catch(err => {
      
      next(err)
    })
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ''
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
    .then((ticket) => {
      const payload = ticket.getPayload()
      email = payload.email

      return User.findOne({
        where: { email }
      })
    })
    .then(user => {
      if(user) {
        const obj = getToken({
          id: user.id,
          email: user.email
        })
        res.status(201).json(obj)
      }
      else {
        //password generate sendiri
        return User.create({email, password: process.env.USER_PWD_GOOGLE})
      }
    })
    .then(registeredUser => {
      const obj = getToken({
        id: registeredUser.id,
        email: registeredUser.email
      })
      res.status(201).json(obj)
    })
    .catch(err => {
      console.log(err)
    })
  }

}

module.exports = ControllerUser