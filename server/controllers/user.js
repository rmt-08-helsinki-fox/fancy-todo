const { User } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { genToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController {

  static register(req, res, next) {
    const { email, password, city} = req.body;
    const newUser = { email, password, city };

    User.create(newUser)
    .then((user) => {
      if (user) {
        res.status(201).json({
          success: 'Registration success',
          id: user.id,
          email: user.email,
          city: user.city
        })
      }
    })
    .catch((err) => {
      next(err);
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({
      where: {
        email
      }
    })
    .then((user) => {
      if(user) {
        const comparedPass = compare(password, user.password)

        if(comparedPass) {
          const payload = { 
            id: user.id,
            email: user.email,
            city: user.city
          }
          const accessToken = genToken(payload)

          res.status(200).json({ accessToken })
        } else {
          throw { name: 'CustomError', error: 'Your email or password is incorrect', status: 400 }
        }
      } else {
        throw { name: 'CustomError', error: 'Your email or password is incorrect', status: 400 }
      }
    })
    .catch((err) => {
      next(err);
    })
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = '';

    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email;

      return User.findOne({where: { email }})
    })
    .then(user => {

      if (user) {
        const accessToken = genToken({
          id: user.id,
          email: user.email,
          city: user.city
        })
        res.status(200).json( {accessToken} )
      } else {
        return User.create({
          email: email,
          password: process.env.RANDOM_PASSWORD
        })
        .then(user => {
          const accessToken = genToken({
            id: user.id,
            email: user.email,
            city: user.city
          })
    
          res.status(201).json( {accessToken} )
        })
      }
    })
    .catch((err) => {
      next(err);
    })

  }
}

module.exports = UserController;