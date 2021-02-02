const { User } = require('../models/index');
const { comparePass } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class userController {
  static async register(req, res) {

    const { email, password } = req.body;

    try {

      const user = await User.create({ email, password });

      if (user) {
        res.status(201).json({
          msg: 'Register success',
          id: user.id,
          email: user.email,
          password: user.password
        })
      }

    } catch (err) {

      const error = err.errors[0].message || 'Internal server error';
      res.status(500).json({ error });

    }

  }

  static async login(req, res) {
    try {

      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) throw { msg: 'Invalid email or password' };

      const comparedPassword = comparePass(password, user.password);

      if (!comparedPassword) throw { msg: 'Invalid email or password' };

      const access_token = generateToken({
        id: user.id,
        email: user.email
      });

      res.status(200).json({
        access_token
      })

    } catch (err) {
      const error = err.msg || 'Internal server error';
      res.status(500).json({ error });
    }
  }
}

module.exports = userController;