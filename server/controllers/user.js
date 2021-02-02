const { User } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { genToken } = require('../helpers/jwt')

class UserController {

  static register(req, res) {
    const { email, password } = req.body;
    const newUser = { email, password };

    User.create(newUser)
    .then((user) => {
      res.status(201).json({
        success: 'Registration success',
        id: user.id,
        email: user.email
      })
    })
    .catch((err) => {
      if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError' && err.errors.length > 0) {
        let errMsg = err.errors.map(err => err.message);
        let error = {errors: errMsg}

        res.status(400).json(error);
      } else {
        res.status(500).json(err);
      }
    })
  }

  static login(req, res) {
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
            email: user.email
          }
          const accessToken = genToken(payload)

          res.status(200).json({ accessToken })
        } else {
          throw { error: 'Your email or password is incorrect', status: 400 }
        }
      } else {
        throw { error: 'Your email or password is incorrect', status: 400 }
      }
    })
    .catch((err) => {
      const errMsg = err.error || 'Internal server error';
      const status = err.status || 500;

      res.status(status).json({ error: errMsg});
    })
  }
}

module.exports = UserController;