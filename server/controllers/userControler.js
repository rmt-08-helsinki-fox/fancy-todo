const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateJwt } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class Controller {
  static async register(req, res, next) {
    try {
      let {email, password} = req.body
      let user = await User.create({email, password})
      let out = {
        id: user.id,
        email: user.email
      }
      res.status(201).json(out)
    } catch (err) {
      if (!err.name) next(err)
      next({name: err.name, errors: err.errors})
    }
  }

  static async login(req, res, next) {
    try {
      let {email, password} = req.body
      let user = await User.findOne({
        where: {
          email
        }
      })
      if (!user || !comparePass(password,user.password)) throw ({ name: "Unauthorize", msg: 'invalid email / password'})
      let payload = {
        id : user.id,
        email : user.email
      }
      let jwt = generateJwt(payload)
      res.status(200).json({ access_token: jwt})
    } catch (err) {
      if (!err.msg) next(err)
      next(err)
    }
  }

  static async oAuthLogin ( req, res, next ) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
      console.log(client);
      let email = ""
      let fullname = "" 
      let password = "abcde" + String(Math.floor(Math.random() * 101010))
      
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT
      })

      const payload = ticket.getPayload()
      email = payload.email
      fullname = payload.name
          
      const user = await User.findOne({
        where: { email }
      })
      if (user) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateJwt(payload)
        res.status(200).json( { access_token } )
      } else {
        const newUser = await User.create({name: fullname, email, password})
        const payload = {
          id: newUser.id,
          email: newUser.email
        }
        const access_token = generateJwt(payload)
        res.status(200).json( { access_token } )
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller