const jwt = require("jsonwebtoken")

function newToken(payload){
  let newToken = jwt.sign(payload, process.env.SECRET)
  return newToken
}

module.exports = { newToken }