const { User } = require('../models/')
const { hash, compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
  static register(req, res, next) {
    //tes,berhasil
    // res.send('tes register')

    const { email, password } = req.body

    User.create({ email, password })
      .then(user => {
        res.status(201).json({

          id: user.id,
          email: user.email,

        })
      })
      .catch(err => {
        // console.log(err);
        // const error = err.errors[0].message || 'internal server error'
        // res.status(500).json({ error })
        next(err)
      })
  }

  static login(req, res, next) {
    //tes,berhasil
    // res.send('ini login')

    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        // tes,user
        // console.log(user);
        if (!user) throw { msg: 'Invalid email or password' }
        const comparedPassword = compare(password, user.password)

        if (!comparedPassword)
          throw { msg: 'Invalid email or password' }
        // throw {
        //   name: 'customError',
        //   msg: 'Invalid email or password',
        //   status: 400
        // }

        const accessToken = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ accessToken })
      })
      .catch(err => {
        // console.log(err, 'dari catch error');
        const error = err.msg || 'internal server error'
        res.status(500).json({ error })
        // next(err)
      })
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = ''
    client
      .verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.CLIENT_ID,
      })
      .then((ticket) => {
        const payload = ticket.getPayload()
        email = payload.email
        console.log(payload);
        return User.findOne({ where: { email } })
      })
      .then((user) => {
        if (user) {
          const token = generateToken({
            id: user.id,
            email: user.email
          })
          res.status(200).json({ access_token: token })
        } else {
          return User.create({
            email, password: process.env.USER_PWD_GOOGLE
          })
        }
      })
      .then((registeredUser) => {
        const token = generateToken({
          id: registeredUser.id,
          email: registeredUser.email
        })
        res.status(201).json({ access_token: token })
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

module.exports = UserController