const jwt = require('jsonwebtoken')

let generateJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

module.exports = {
  generateJwt,
}