const bcrypt = require('bcrypt');

const hashPass = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashPass,
    comparePassword
}