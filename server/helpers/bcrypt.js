const bcrypt = require('bcryptjs')

function hashingPass(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash
}

function checkPass(password, hashedPass) {
  return bcrypt.compareSync(password, hashedPass)
}

module.exports = {
  hashingPass,
  checkPass
}