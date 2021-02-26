const bcrypt = require('bcryptjs');

const hashPass = pass => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash
}

const compare = (pass,passDb) => {
    return bcrypt.compareSync(pass, passDb);
}

module.exports = {
    hashPass,
    compare
}