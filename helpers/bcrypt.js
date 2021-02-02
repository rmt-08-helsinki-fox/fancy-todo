const bcrypt = require('bcryptjs')

function hashPassword(password) {
  let salt = brcypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, userpasswords) {
  return bcrypt.compareSync(password, userpasswords)
}

module.exports = {hashPassword, comparePassword}
