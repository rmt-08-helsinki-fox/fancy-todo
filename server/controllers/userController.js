const { User } = require("../models")
const { checkPassword } = require("../helpers/bycript")
const { generateToken } = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');

class Controller {
  static register(req, res, next) {
    let { email, password } = req.body
    User.create({
      email, 
      password
    }).then(user => {
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    }).catch(err => {
      console.log(err);
      next(err)
    })
  }
  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    }).then(user => {
      if (!user) throw {name: "invalidError", message: "Invalid email or password"}
      let checkPwd = checkPassword(password, user.password)
      if (!checkPwd) throw {name: "invalidError", message: "Invalid email or password"}
      const accessToken = generateToken({ id: user.id, email: user.email })
      res.status(200).json({ email: user.email, accessToken })
    }).catch(err => {
      console.log(err);
      next(err)
    })
  }
  static googleLogin (req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ""
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    }).then(ticket => {
        const payload = ticket.getPayload()
        email = payload.email
        return User.findOne({where: {email}}) 
    }).then(user => {
      if(user) {
        const accessToken = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({accessToken})
      }else{
        return User.create({email, password: process.env.USER_PWD})
      }
    }).then(registeredUser => {
        const accessToken = generateToken({
          id: registeredUser.id,
          email: registeredUser.email
        })
        res.status(201).json({email: registeredUser.email, accessToken})
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = Controller