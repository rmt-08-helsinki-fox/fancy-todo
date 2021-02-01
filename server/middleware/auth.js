const { verifyToken } = require('../helper/jwt')
const { User, Todo } = require('../models')

async function authenticate (req, res, next) {
  try {
    if (req.headers.access_token) {
      const { id } = verifyToken(req.headers.access_token)
      let user = await User.findByPk(id)
      if (user) {
        req.headers.UserId = user.id
        next()
      } else {
        throw ({ name: 401})
      }
    } else {
      throw ({ name: 403, message: 'please login first'})
    }
  } catch (err) {
    console.log(err)
  }
}

async function authorize (req, res, next) {
  try {
    let id = req.params.id
    let UserId = req.headers.UserId
    let todo = await Todo.findByPk(id)
    if (todo) {
      if (UserId == todo.UserId) {
        next()
      } else {
        throw ({ name: 401 })
      }
    } else {
      throw ({ name: 404 })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { authenticate, authorize }