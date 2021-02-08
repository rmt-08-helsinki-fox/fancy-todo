const jwt = require('jsonwebtoken')

let generateJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

let verifyJwt = (access_token) => {
  return jwt.verify(access_token, process.env.JWT_SECRET)
}

module.exports = {
  generateJwt,
  verifyJwt
}