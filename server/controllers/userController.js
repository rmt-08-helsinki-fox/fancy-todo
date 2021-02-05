const {User} = require('../models/')
const {comparePassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');


class UserController {
  static register(req, res, next) {
    User.create(req.body)
      .then((data) => {
        res.status(201).json(data)
      }).catch((err) => {
        console.log(err.errors);
        next(err)
      });
  }

  static login(req, res) {
    const {
      email,
      password
    } = req.body

    User.findOne({
        where: {
          email
        }
      })
      .then((data) => {
        if (!data) throw {
          msg: 'invalid email or password'
        }
        const compare = comparePassword(password, data.password)
        if (!compare) throw {
          msg: 'invalid email or password'
        }
        const acces_token = generateToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({
          acces_token
        })
      }).catch((err) => {
        console.log(err);
        const error = err.msg || 'Internal server error'
        res.status(500).json({
          error
        })
      });
  }

  static googleloginhandler(req, res, next) {
    let {id_token} = req.body
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    let payload = null
    //console.log(`masukkk====>`)

    client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        console.log(ticket)
        payload = ticket.getPayload()
        return User.findOne({
          where: {
            email: payload.email
          }
        })
      })
      .then(user => {
        console.log(user)
        if (!user) {
          //console.log(`masukkk====>`)
          return User.create({
            email: payload.email,
            password: Math.floor(Math.random() * 1000) + 'iniDariGoogle'
          })
        } else {
          return user
        }
      })
      .then(user => {
        let googleSign = {
          id: user.id,
          email: user.email
        }
        let accessToken = generateToken(googleSign)
        return res.status(201).json({
          access_token: accessToken
        })
      })
      .catch(err => {
        next(err)
      })

  }
}

module.exports = UserController