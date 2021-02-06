const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');


class UserController {

  static register(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
      .then(user => {
        res.status(201).json({msg: 'Register Success'})
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({where:{email}})
      .then(user => {
        if (!user) throw { msg: "Invalid email dan password", status: 400 }
        const comparePassword = comparePass(password, user.password)
        if (!comparePassword) throw { msg: "Invalid email and password", status: 400}
        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({access_token})
      })
      .catch(err => {
        next(err)
      })
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = ""
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      console.log(payload);
      email = payload.email

      return User.findOne({where: { email} })
    })
    .then(user => {
      if (user) {
        const token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({access_token: token})
      } else {
        return User.create({
          email,
          password: process.env.USER_PWD_GOOGLE
        })
      }
    })
    .then(registeredUser => {
      const token = generateToken({
        id: registeredUser.id,
        email: registeredUser.email
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

}

module.exports = UserController