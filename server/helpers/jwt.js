const jwt = require('jsonwebtoken')

function generateJwt(payload) {
  return jwt.sign(payload, process.env.Secret)
}

module.exports = generateJwt