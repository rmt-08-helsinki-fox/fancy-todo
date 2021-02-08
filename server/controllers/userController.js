const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
  static async signUp(req, res, next) {
    try {
      const { email, password } = req.body
      let newUser = await User.create({
        email,
        password
      })
      res.status(201).json({
        id: newUser.id,
        email: newUser.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async signIn(req, res, next) {
    try {
      const { email, password } = req.body
      let user = await User.findOne({
        where: {
          email: email
        }
      })
      if (user) {
        const comparedPassword = comparePassword(password, user.password)
        if (comparedPassword) {
          const token = generateToken({
            id: user.id,
            email: email
          })
          res.status(200).json({token})
        } else {
          throw { name: 'CustomError', msg: 'Email or password is wrong', status: 400 }
        }
      } else {
        throw { name: 'CustomError', msg: 'Email or password is wrong', status: 400 }
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const client = await new OAuth2Client(process.env.CLIENT_ID, 'RDnz_QwWHFLvl50NojC2hN_J')
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.CLIENT_ID,
      })
      const payload = await ticket.getPayload()
      const user = await User.findOne({where: {email: payload.email}})
      if (user){
        const access_token = generateToken({
          id: user.id,
          email: user.email,
        })
        res.status(200).json({access_token})
      } else {
        const newUser = await User.create({
          email: payload.email,
          password: process.env.GOOGLE_USER_PASS,
        })
        access_token = await generateToken({
          id: newUser.id,
          email: newUser.email,
        })
        res.status(201).json({access_token, id: newUser.id})
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController