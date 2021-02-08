const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');
const { checkHash, createToken } = require('../helpers');

class UserController {
  static register (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    User.create(req.body)
      .then(user => {
        res.status(201).json({
          data: { id: user.id, email: user.email }, msg: `Create account success`
        });
      })
      .catch(err => next(err));
  };

  static login (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    User.findOne({ where: { email: req.body.email } })
      .then(data => {
        if (!data) throw (`Invalid email or password`);

        const compare = checkHash(req.body.password, data.password);
        if (!compare) throw (`Invalid email or password`);

        const token = createToken({ id: data.id, email: data.email });
        res.status(200).json({ token, msg: `Welcome ${data.email}` });
      })
      .catch(err => next(err))
  }
};

module.exports = UserController;