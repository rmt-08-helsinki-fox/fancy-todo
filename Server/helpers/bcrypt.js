const bcrypt = require('bcryptjs')

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, userpasswords) {
  return bcrypt.compareSync(password, userpasswords)
}

module.exports = {hashPassword, comparePassword}
