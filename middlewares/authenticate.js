const jwt = require('jsonwebtoken')
const authenticate = function authentication(req, res, next) {
  try {
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.SECRET)
    req.decoded = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid Token' })
  }
}

module.exports = authenticate