const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function checkPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}


module.exports = {
  hashPassword,
  checkPassword
}