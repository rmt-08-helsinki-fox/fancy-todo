const { User } = require('../models/index');

const { generateToken } = require('../helpers/jwt')


class UserController{
  static getRegister (req,res) {

  }

  static postRegister (req, res) {

  }

  static getLogin (req, res) {

  }

  static postLogin (req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if(!user) throw { msg: 'Invalid email or password' };
        const comparedPassword = comparePassword(password, user.password);
        if (!comparedPassword) throw {msg: 'Invalid email or password'};
        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({access_token})
      })
      .catch(err => {
        const error = err.msg || 'Internal server error';
        res.status(500).json({ error })
      })
  }

  // contoh async

  // static async login(req, res) {
  //   try{
  //     const { email, password } = req.body;
  //     const user = await User.findOne({
  //       where: {
  //         email
  //       }
  //     })
  //     if (!user) throw { msg: 'Invalid email or password' };
  //     const comparedPassword = comparePassword(password, user.password);
  //       if (!comparedPassword) throw ('ini pesan error');
  //       const access_token = generateToken({
  //         id: user.id,
  //         email: user.email
  //       })
  //       res.status(200).json({access_token})
  //   } catch(err) {
  //     const error = err.msg || 'Internal server error';
  //     res.status(500).json({ error })
  //   }
  // }
}

module.exports = UserController;

