const bcrypt = require('bcryptjs');

let hashPassword = (password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

let comparePass = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass)
}

module.exports = {
  hashPassword,
  comparePass
}