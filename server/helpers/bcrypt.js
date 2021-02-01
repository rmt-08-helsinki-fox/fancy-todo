const bcrypt = require('bcrypt')

class HelperBcrypt {
  static hashPassword (password) {
    const hashPass = bcrypt.hashSync(password, 8)
    return hashPass
  }

  static comparePassword (password, hashPass){
    return bcrypt.compareSync(password, hashPass)
  }
}

module.exports = HelperBcrypt