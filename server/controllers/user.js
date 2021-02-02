const { User } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { genToken } = require('../helpers/jwt')

class UserController {

  static register(req, res, next) {
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
            email: user.email
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
}

module.exports = UserController;