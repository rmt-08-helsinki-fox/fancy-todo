const { verifyToken } = require('../helper/jwt')

async function authenticate(req, res, next) {
  try {
    const token = req.headers.access_token
    const decoded = verifyToken(token)

    req.decoded = decoded;
  console.log(req.decoded, '<<<<<< 3');
  let user = await User.findOne({ where: { email: decoded.email } })
  if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
  }
  if (user) {
      req.user = { id: user.id }
      return next()
  }
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