const { User } = require('../models/')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {

  static register(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
     next(err)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const options = {
      where: {
        email
      }
    }
    User.findOne(options)
    .then((user) => {
      if (!user) throw { name: 'Error400', status: 400, msg: 'Invalid email or password' }
      
      const comparedPassword = comparePass(password, user.password)
      if (!comparedPassword || !user) throw { name: 'Error400', status: 400, msg: 'Invalid email or password' }

      const accessToken = generateToken({
        id: user.id,
        email: user.email
      })
      
      res.status(200).json({ accessToken })
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
  }

  
  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ""

    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID,
    })
    .then((ticket) => {
      const payload = ticket.getPayload()
      email = payload.email
      
      return User.findOne({ where: { email } })
    })
    .then((user) => {
      if (user) {
        const token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ accessToken: token})
      } else {
        return User.create({
          email,
          password: process.env.USER_PWD_GOOGLE
        })
      }
    })
    .then((registeredUser) => {
      console.log(registeredUser, "REGISTERED USER");
      const token = generateToken({
        id: registeredUser.id,
        email: registeredUser.email
      })
      res.status(201).json({ accessToken: token})
    })
    .catch((err) => {
      console.log(err);
    })
  }

}

module.exports = UserController