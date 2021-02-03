const { verifyToken } = require('../helper/jwt')

function authenticate(req, res, next) {
  try {
    const token = req.headers.token
    const decoded = verifyToken(token)

    req.decoded = decoded;
  console.log(req.decoded, '<<<<<< 3');


    next();
  } catch (err) {
    res.status(401).json({ message: 'invalid token' })
  }
}

function authorize(req, res, next) {
  console.log(req.decoded, '<<<<<< 1');
  console.log(req.decoded.username, '<<<<<< 2');
  if (req.decoded.username === 'testes') next();
  else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

module.exports = { authenticate, authorize }