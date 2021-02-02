const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.decoded = decoded;

    next();
  } catch (err) {
    next({ name: 'CustomError', msg: 'Invalid Token', status: 401 });
  }
}

module.exports = authentication;