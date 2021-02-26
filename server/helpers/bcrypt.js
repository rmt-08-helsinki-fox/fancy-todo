const bcrypt = require('bcryptjs')

function hashPassword(password){ 
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password, hasshedPassword){
    return bcrypt.compareSync(password, hasshedPassword);
}

module.exports = {hashPassword, comparePassword}