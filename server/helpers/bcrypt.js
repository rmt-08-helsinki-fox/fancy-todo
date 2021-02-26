const bcrypt = require('bcryptjs')

function criptPassword(password) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

function comparePassword(password, criptedPassword) {
  return bcrypt.compareSync(password, criptedPassword)
}

module.exports = {
  criptPassword,
  comparePassword
}