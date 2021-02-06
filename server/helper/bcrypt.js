const bcrypt = require("bcryptjs")

const salt = bcrypt.genSaltSync(10);

const hashPass = (password) => {
    return bcrypt.hashSync(password, salt)
}

const comparePass = (inputPass, passHashed) => {
    return bcrypt.compareSync(inputPass, passHashed)
}

module.exports = {
    hashPass,
    comparePass
}