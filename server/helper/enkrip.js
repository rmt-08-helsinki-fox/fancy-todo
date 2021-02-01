const bcrypt = require('bcryptjs')

function enkrip(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    enkrip
}