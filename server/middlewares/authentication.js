//const jwt = require('jsonwebtoken')
const verify = require('../helper/jwt').verify

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.token
    const decoded = verify(token, process.env.SECRET)

    req.decoded = decoded

    next()
  } catch (error) {
    res.status(401).json({
      msg: 'Invalid token/Not Authorized'
    })
  }
}

module.exports = authenticate