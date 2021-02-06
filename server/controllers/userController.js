const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const CLIENT_ID = process.env.CLIENT_ID

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body
    const dataUser = { name, email, password }
    console.log(req.body); //
    User.create(dataUser)
    .then(user => {
      res.status(200).json({
        message: 'Register success',
        name: user.name,
        email: user.email
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const dataUser = { email, password }
    console.log(req.body); //
    User.findOne({
      where: {
        email: dataUser.email
      }
    })
    .then(user => {
      if (!user) {
        throw { msg: 'Invalid email or password' }
      }
      const comparedPassword = comparePassword(password, user.password)
      if (!comparedPassword) {
        throw { msg: 'Invalid email or password' }
      }
      const accessToken = generateToken({
        id: user.id,
        email: user.email
      })
      // console.log(accessToken, 'user controller'); //
      res.status(200).json({ accessToken })
    })
    .catch(err => {
      next(err)
    })
  }

  static googleLogin(req, res, next) {
    console.log('masuuk', CLIENT_ID);
    
    console.log(new OAuth2Client);
    const client = new OAuth2Client(CLIENT_ID);
    client.verifyIdToken({
      idToken: req.body.generateToken,
      audience: CLIENT_ID
    })
    .then(tiket => {
      const payload = tiket.getPayload()
      console.log({payload});
    })
    .catch(err => {
      console.error({err})
    })
  }
}

module.exports = UserController;