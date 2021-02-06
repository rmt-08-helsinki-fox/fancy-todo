const bcrypt = require('bcrypt')

function hashPassword (inputPassword) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(inputPassword, salt);
}
function comparePassword (inputUser, DBUser) {
  return bcrypt.compareSync(inputUser, DBUser)
}

module.exports = { hashPassword, comparePassword }