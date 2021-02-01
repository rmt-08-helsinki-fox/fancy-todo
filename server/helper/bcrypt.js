const bcrypt = require('bcrypt')
const saltRound = 10

function hashPassword (password) {
  const salt = bcrypt.genSaltSync(saltRound)
  const hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword
}

function comparePassword (password, hashedPassword) {
  const compareResult = bcrypt.compareSync(password, hashedPassword)
  return compareResult
}

module.exports = { hashPassword, comparePassword }