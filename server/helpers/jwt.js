const jwt = require('jsonwebtoken')
const SECRET = 'secret'

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET)
  return token
}

module.exports = {
  generateToken
}