const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

function generateToken(payload) {
  const token = jwt.sign(payload, 'secret')
  return token
}

module.exports = {
  generateToken
}