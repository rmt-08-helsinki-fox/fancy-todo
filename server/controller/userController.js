const { User } = require('../models/index');
const { comparePass } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class userController {
  static async register(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.create({ email, password });
      if (user) {
        res.status(201).json({
          msg: 'Register success',
          id: user.id,
          email: user.email
        })
      }
    } catch (err) {
      err.from = 'userController:register';
      const error = err.errors[0].message || 'Internal server error';
      if (email === '' || password === '') res.status(400).json({ error });
      res.status(500).json({ error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {

      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) throw { error: 'Invalid email or password' };
      const comparedPassword = comparePass(password, user.password);
      if (!comparedPassword) throw { error: 'Invalid email or password' };
      const access_token = generateToken({
        id: user.id,
        email: user.email
      });
      res.status(200).json({
        access_token
      })
    } catch (err) {
      err.from = 'userController:login';
      if (email === '' || password === '') res.status(400).json({ error: 'Email dan password harus diisi!' });
      if (err.error) res.status(404).json({ error: err.error })
      res.status(500).json({ err });
    }
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = "";
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        email = payload.email;
        return User.findOne({ where: { email } });
      })
      .then(user => {
        if (user) {
          const token = generateToken({
            id: user.id,
            email: user.email
          })
          res.status(201).json({ access_token: token });
        } else {
          return User.create({
            email,
            password: process.env.RANDOM_PASSWORD
          })
        }
      })
      .then(registeredUser => {
        const token = generateToken({
          id: registeredUser.id,
          email: registeredUser.email
        })
        res.status(201).json({ access_token: token });
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = userController;