const jwt = require('jsonwebtoken')
// const api_key = process.env.JWT_TOKEN

function generateToken (input) {
  return jwt.sign(input, 'api_key');
}
function verify (inputToken) {
  return jwt.verify(inputToken, 'api_key')
}

module.exports = { generateToken, verify }