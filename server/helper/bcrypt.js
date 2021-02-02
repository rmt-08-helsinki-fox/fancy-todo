const bcrypt = require('bcryptjs')

function encrypt(password) {
let salt = bcrypt.genSaltSync(10);
return bcrypt.hashSync(password, salt);
}

function compare(password, dbpassword) {
return bcrypt.compareSync(password, dbpassword); // true
}

module.exports = {encrypt, compare}