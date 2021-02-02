const bcrypt = require('bcryptjs')

function hashPass(pswd){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pswd, salt)
}

function comparePass(pswd, hashedPswd){
    return bcrypt.compareSync(pswd, hashedPswd)
}


module.exports = {hashPass, comparePass}