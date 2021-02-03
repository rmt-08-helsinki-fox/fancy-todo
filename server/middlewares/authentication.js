const jwt = require('jsonwebtoken')

const authenticate = function (req, res, next) {
  try {
    const access_token = req.headers.access_token
    const decoded = jwt.verify(access_token, process.env.SECRET)

    req.decoded = decoded
    next()
  } catch (err) {
    res.status(401).json({
      error: [`Invalid token`]
    })
  }
}

module.exports = authenticate 