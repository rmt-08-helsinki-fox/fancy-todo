const bcryptjs = require('bcryptjs')
const db = require('../models')
const salt = bcryptjs.genSaltSync(10)

function hashPassword(password) {
  let hashedPassword = bcryptjs.hashSync(password, salt)
  return hashedPassword
}

function comparePassword(input, db_pass) {
  let comparedPassword = bcryptjs.compareSync(input, db_pass)
  return comparedPassword
}



module.exports = {
  hashPassword,
  comparePassword
}