const bcrypt = require('bcryptjs');

function convert (password) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  return hash;
}

function checkPass (pass, dbPass) {
  let result = bcrypt.compareSync(pass, dbPass);

  return result;
}

module.exports = { convert, checkPass };