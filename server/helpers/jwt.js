const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY

function generateToken(payload){
  const token = jwt.sign(payload, SECRET_KEY)
  return token
}

function checkToken(token){
  const verified = jwt.verify(token, SECRET_KEY)
  return verified
}

module.exports = {
  generateToken,
  checkToken
}