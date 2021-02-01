const bcrypt = require('bcryptjs')

const hashing = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const compare = (inputPassword, passwordDb) => {
    return bcrypt.compareSync(inputPassword, passwordDb)
}

module.exports = { hashing, compare }