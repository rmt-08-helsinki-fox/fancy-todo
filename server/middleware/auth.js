const { verify } = require("../helper/jwt")
const { Todo, User } = require('../models')

async function authenticate (req, res, next) {
  try {
    const access_token = req.headers.access_token
    const email = verify(access_token).email
    const find = await User.findOne({ where: { email }})
    console.log('dari authenticate')
    if (!access_token || !find) {
      next({
        name: 'authenticate'
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
    if (!find) {
      next({
        name: 'undefined'
      })
    } else if (find.UserId !== UserId) {
      next({
        name: 'authorized'
      })
    } else {
      req.todo = {
        id: find.id,
        title: find.title,
        description: find.description,
        status: find.status,
        due_date: find.due_date,
        UserId
      }
      next()
    }
  } catch (err) {
    next(err)
  }
}
module.exports = { authenticate, authorized }