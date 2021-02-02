const bcrypt = require('bcryptjs')

function genPass(password){
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

function comparePass(password, hasPassword){
  return bcrypt.compareSync(password, hasPassword)
}

module.exports = {
  genPass,
  comparePass
}