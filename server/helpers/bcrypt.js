//@ts-check
const bcrypt = require("bcryptjs")

function hasPass(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparePass(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hasPass,
    comparePass,
}
