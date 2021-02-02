const {verifyJwt} = require('../helpers/jwt')
const {User, Todo} = require('../models')

const authenticate = async (req, res, next) => {
  try {
    let decoded = verifyJwt(req.headers.access_token)
    user = await User.findOne({
      where: {
        email: decoded.email
      }
    })
    if (!user) throw ({status: 401}) 
    req.userData = {
      userId: user.id,
      userEmail: user.email
    }
    next()
  } catch (err) {
    next({status: 401})
  }
}

const authorize = async (req, res, next) => {
  try {
    const {id} = req.params
    const {userId, userEmail} = req.userData
    const todo = await Todo.findByPk(id)
    if (!todo) throw ({status: 404})
    if (todo.UserId !== userId) throw ({status: 401})
    next();
  } catch (err) {
    if (!err.status) next(err)
    next(err)
  }
}

module.exports = {
  authenticate,
  authorize
}