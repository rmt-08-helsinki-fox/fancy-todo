const bcrypt = require('bcrypt');

function hashPassword(password){
    let saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

function verifyPassword(plain,hashed){
    return bcrypt.compareSync(plain,hashed);
}

module.exports = { hashPassword, verifyPassword }