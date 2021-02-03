const verify = require('../helpers/jwt').verify;

const authenticate = function (req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = verify(token);
    req.decoded = decoded;

    next();
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
}

module.exports = {
  authenticate
};