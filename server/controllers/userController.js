const { User } = require('../models/');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(user => {
        res.status(201).json({
          id: user.id,
          email: user.email
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
}

module.exports = UserController;