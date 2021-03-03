const bcrypt = require('bcryptjs')

const hash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const compare = (password, hashed) => {
    return bcrypt.compareSync(password, hashed)
}

module.exports = {hash, compare}