const jwt = require('jsonwebtoken')

function generateJwt(payload) {
  return jwt.sign(payload, process.env.Secret)
}

function verifyJwt(token) {
  return jwt.verify(token, process.env.Secret)
}

module.exports = {
  generateJwt,
  verifyJwt
}