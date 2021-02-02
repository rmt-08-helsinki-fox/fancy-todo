const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  try {
    const access_token = req.headers.access_token
    const decode = jwt.verify(access_token, process.env.SECRET)
    req.decode = decode
    next()
  } catch (err) {
    res.status(400).json({
      message: 'Invalid Token'
    })
  }
}

module.exports = authenticate