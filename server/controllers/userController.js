const { User } = require('../models/');
const { comparePassword } = require('../helpers/bcrypt');
const generateToken = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(newUser => {
        res.status(201).json({
          id: newUser.id,
          email: newUser.email
        })
      })
      .catch(err => {
        next(err);
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ 
      where: { email }
    })
      .then(user => {
        if (!user) throw { name: 'CustomError', msg: 'Invalid email or password', status: 400 };
        
        const resultCompare = comparePassword(password, user.password);

        if (!resultCompare) throw { name: 'CustomError', msg: 'Invalid email or password', status: 400 };

        const accessToken = generateToken({
          id: user.id,
          email: user.email
        });

        res.status(200).json({ accessToken });
      })
      .catch(err => {
        next(err);
      })
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email;
    let isExist = false;

    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        email = payload.email;

        return User.findOne({ where: { email } })
      })
      .then(user => {
        if (user) {
          isExist = true;
          return user;
        } else {
          return User.create({
            email,
            password: process.env.DEFAULT_PASSWORD_GOOGLE
          })
        }
      })
      .then(user => {
        const accessToken = generateToken({
          id: user.id,
          email: user.email
        })

        if (isExist) {
          res.status(200).json({ accessToken });
        } else {
          res.status(201).json({ accessToken });
        }
      })
      .catch(err => {
        next(err)
      })


  }
}

module.exports = UserController;