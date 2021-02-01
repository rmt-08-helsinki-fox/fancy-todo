const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const hashPass = (password) => bcrypt.hashSync(password, salt)

const comparePass = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword)


module.exports = { hashPass, comparePass }