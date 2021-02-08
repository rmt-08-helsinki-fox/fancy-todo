const { verify } = require('../helpers/jwt');

const authentication = (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = verify(token, process.env.SECRET_JWT);
    req.decoded = decoded;

    next();
  } catch (err) {
    next({ name: 'Error401', msg: 'Invalid Token', status: 401 });
  }
}

module.exports = authentication;