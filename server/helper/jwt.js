const jwt = require('jsonwebtoken')
const api_key = process.env.JWT_TOKEN

async function generateToken (input) {
  return jwt.sign(input, api_key);
}

module.exports = { generateToken }