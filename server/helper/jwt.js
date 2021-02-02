const jwt = require('jsonwebtoken')

function generateToken (input) {
  return jwt.sign(input, 'process.env.JWT_TOKEN');
}
function verify (inputToken) {
  return jwt.verify(inputToken, 'process.env.JWT_TOKEN')
}

module.exports = { generateToken, verify }