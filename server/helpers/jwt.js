const jwt = require('jsonwebtoken')

function generateToken(payload){
  return jwt.sign(payload, process.env.SECRET)
}

function accessToken(reqToken){
  return decoded = jwt.verify(reqToken, process.env.SECRET)
}

module.exports = {
  generateToken,
  accessToken
}