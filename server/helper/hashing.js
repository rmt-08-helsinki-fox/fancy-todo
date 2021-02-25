const bcrypt = require('bcryptjs');
const hash = (password) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}
const checkPassword = (inputPassword, hashedPassword) => {
    const result = bcrypt.compareSync(inputPassword, hashedPassword);
    return result;
}

module.exports = { hash, checkPassword }