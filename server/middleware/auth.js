const { verify } = require("../helper/jwt")
const { Todo, User } = require('../models')

async function authenticate (req, res, next) {
  try {
    const access_token = req.headers.access_token
    const email = verify(access_token).email
    const find = await User.findOne({ where: { email }})
    console.log('dari authenticate')
    if (!access_token || !find) {
      res.status(400).json({
        msg: 'Need login!'
      })
    } else {
      req.user = { id: find.id, email: find.email}
      next()
    }
  } catch (err) {
    next(err)
  }
}
async function authorized (req, res, next) {
  const UserId = +req.user.id
  const id = +req.params.id
  console.log('dari authorized')
  try {
    const find = await Todo.findOne({ where: { id }})
    console.log(find, '========find')
    console.log(UserId, '========== User id')
    if (find.UserId !== UserId) {
      next({
        name: 'authorized'
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}
module.exports = { authenticate, authorized }