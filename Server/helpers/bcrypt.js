const bcrypt = require('bcryptjs')

function hashPass(password){
  let salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

function comparePass(password, passwordDB){
  return bcrypt.compareSync(password, passwordDB)
}


module.exports = {
  hashPass,
  comparePass
}