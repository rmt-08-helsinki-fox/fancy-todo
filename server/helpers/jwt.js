const jwt = require('jsonwebtoken')

function createToken(payload) {
  return jwt.sign(payload, process.env.SECRET)
}

module.exports = { createToken }