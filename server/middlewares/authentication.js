const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
  try {
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.Secret);

    req.token = decoded

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication