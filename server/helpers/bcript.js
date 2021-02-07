const bcript = require('bcryptjs')

function hashPassword(password) {
    const salt = bcript.genSaltSync(10)
    return bcript.hashSync(password,salt)
}

function comparePassword(password, hashPassword) {
    return bcript.compareSync(password, hashPassword)
}

module.exports = {
    hashPassword, comparePassword
}