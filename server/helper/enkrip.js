const bcrypt = require('bcryptjs')

function enkrip(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePass(password, hashPass) {
    return bcrypt.compareSync(password, hashPass);
}

module.exports = {
    enkrip, comparePass
}