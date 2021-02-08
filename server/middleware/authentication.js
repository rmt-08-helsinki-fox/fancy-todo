require('dotenv').config()
const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
  try {
    const token = req.headers.access_token
    const decode = jwt.verify(token, process.env.SECRET_JWT)
    // console.log(decode, 'authen')
    req.decode = decode
    next()
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token'
    })
  }
}
module.exports = authentication