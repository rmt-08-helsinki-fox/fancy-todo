const bcrypt = require("bcryptjs");

function hashing(pass) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
}

function compare(pass, passDb) {
  return bcrypt.compareSync(pass, passDb);
}

module.exports = {
  hashing,
  compare,
};
