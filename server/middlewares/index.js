let jwt = require('jsonwebtoken');
const { User, Todo } = require('../models');
const { checkToken } = require('../helpers');
const user = require('../models/user');

const authentication = (req, res, next) => {
  const token = req.headers.token;
  const check = checkToken(token);
  const email = check.email;

  if (!email) throw (`Invalid token`);
  else {
    User.findOne({ where: { email: email } })
      .then(data => {
        if (!data) throw (`Not authorized`);
        else {
          req.decoded = check;
          next();
        }
      })
      .catch(err => next(err))
  }
};

const authorize = (req, res, next) => {
  try {
    
    Todo.findByPk(+req.params.id)
      .then(data => {
        if (!data) throw 404;
        else {
          const user_id = req.decoded.id;

          if (data.user_id != user_id) throw 404;
          else next();
        }
      })
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authentication,
  authorize
}

