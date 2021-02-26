const { comparePassword } = require('../helper/bcrypt')
const { User } = require('../models')
const { generateToken } = require('../helper/jwt')

class UserController {
  static register(req, res){
    const { username, email, password } = req.body

    User.create({ username, email, password })
    .then(data => {
      let response = {
        id: data.id,
        username: data.username,
        email: data.email
    }
      res.status(201).json(response)
    })
    .catch(err => next(err))
  }

  static login (req, res, next){
    const { email, password } = req.body
    User.findOne({
      where: { email }
    })
    .then(data => {
      if (!data) throw { status: 400, msg: "Invalid email or password" }
      const compare = comparePassword(password, data.password)
      if (!compare){
        throw { status: 400, msg: "Invalid email or password2" }
      }
      const access_token = generateToken({
        id: data.id,
        username: data.username,
        email: data.email
      })
      res.status(200).json({ access_token })
    })
    .catch(err => next(err))
  }

  static async loginGoogle(req, res, next) {
    try {
      const { id_token } = req.body
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
      const ticket = await client.verifyIdToken({
          idToken: id_token,
          audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload()
      const email = payload.email
      let password = email.toString().split('@')
      password = password[0]
      let user = await User.findOne({ where: { email } })
      if (!user) {
          let newUser = { email, password }
          let createUser = await User.create(newUser)
          const payload = {
              id: createUser.id,
              email: createUser.email
          }
          const access_token = generateToken(payload)
          return res.status(201).json({ access_token })
      } else {
          const payload = {
              id: user.id,
              email: user.email
          }
          const access_token = generateToken(payload)
          return res.status(200).json({ access_token })
      }

    } catch (err) {
        console.log(err)
        return next(err)
    }
  }
}

module.exports = UserController