const bcrypt = require('bcryptjs')


function hashing(password) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

function compare(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword)
}


module.exports = {
  hashing,
  compare
}