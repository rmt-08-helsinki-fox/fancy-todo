const bcryptjs = require('bcryptjs')
const db = require('../models')
const salt = bcryptjs.genSaltSync(10)

function hash_password(password) {
  let hashed_pass = bcryptjs.hashSync(password, salt)
  return hashed_pass
}

function compare_password(input, db_pass) {
  let compared_pass = bcryptjs.compareSync(input, db_pass)
  return compared_pass
}



module.exports = {
  hash_password,
  compare_password
}