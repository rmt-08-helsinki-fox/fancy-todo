const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
  try {
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.Secret);

    req.token = decoded

    next()
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token' })
  }
}

module.exports = authentication