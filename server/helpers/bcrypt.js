const bcrypt = require('bcryptjs');

function hashPass(password){
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  return hash
}

function comparePass(password, hashPassword){
  let compare = bcrypt.compareSync(password, hashPassword)

  return compare
}

module.exports = { hashPass, comparePass }
