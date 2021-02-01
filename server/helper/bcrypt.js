const bcrypt = require('bcrypt')

async function hashPassword (inputPassword) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(inputPassword, salt);
}


module.exports = { hashPassword }