const verify = require('../helpers/jwt').verify;

const authenticate = function (req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = verify(token);
    req.decoded = decoded;
    next();
  } catch (err) {
    err.error = {
      name: 'CustomError',
      error: 'Invalid token',
      status: 401
    }
    next(err.error);
  }
}

module.exports = {
  authenticate
};