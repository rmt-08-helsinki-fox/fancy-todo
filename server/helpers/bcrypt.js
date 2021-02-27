const bcrypt = require('bcryptjs');

const hashing = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt)
}

const compare = (pass, hashedPass) => {
  return bcrypt.compareSync(pass, hashedPass);
}

module.exports = { hashing, compare }