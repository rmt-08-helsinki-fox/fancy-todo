const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function checkPassword(inputPassword, dbPassword) {
  return bcrypt.compareSync(inputPassword, dbPassword);
}

module.exports = {
  hashPassword,
  checkPassword,
};
