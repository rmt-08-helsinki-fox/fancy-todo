const { User } = require("../models")
const { comparePass } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const { OAuth2Client } = require("google-auth-library")

module.exports = class UserController {
  static register(req, res, next) {
    const { email, password } = req.body

    User.create({ email, password }, { returning: true })
      .then(newUser => {
        res.status(201).json({ id: newUser.id, email: newUser.email })
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body

    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          throw {
            name: "customError",
            msg: "Invalid Email or password",
            status: 400
          }
        }
        const comparedPass = comparePass(password, user.password)
        if (!comparedPass) {
          throw {
            name: "customError",
            msg: "Invalid Email or password",
            status: 400
          }
        }
        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ""
    client.verifyIdToken({
      idToken: req.body.google_token,
      audience: process.env.CLIENT_ID,
    })
      .then((ticket) => {
        const payload = ticket.getPayload()
        email = payload.email
        console.log(payload, "ini payload")
        return User.findOne({ where: { email } })
      })
      .then((user) => {
        if (!user) {
          console.log("Registering with google")
          return User.create({ email, password: process.env.SECRET_PASS })
        } else {
          const access_token = generateToken({
            id: user.id,
            email: user.email,
          })
          res.status(200).json({ access_token: access_token })
        }
      })
      .then((registeredUser) => {
        console.log("Logining with google")
        const access_token = generateToken({
          id: registeredUser.id,
          email: registeredUser.email,
        })
        res.status(201).json({ access_token: access_token })
      })
      .catch((err) => {
        next(err)
      })
  }
}