const {verify} = require('../helpers/jwt')

const authenticate = function (req, res, next) {
  try {
    const token = req.headers.token
    const decode = verify(token)
    req.decode = decode
    next()
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = authenticate