const jwt = require('jsonwebtoken')
const authenticate = function authentication(req, res, next) {
  try {
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.SECRET)
    req.decoded = decoded
    next()
  } catch (error) {
    console.log(error, '----error authenticate')
    let err = {name: 'CustomError', msg:'Invalid Token', status: 401}
    next(err)
  }
}

module.exports = authenticate