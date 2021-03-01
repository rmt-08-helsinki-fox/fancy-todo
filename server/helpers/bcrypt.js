const bcrypt = require('bcryptjs');

function hashPass(password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function  comparePass(password, passwordDb) {
    return bcrypt.compareSync(password, passwordDb);
}

module.exports = { hashPass, comparePass };