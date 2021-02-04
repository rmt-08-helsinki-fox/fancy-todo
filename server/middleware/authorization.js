const { Todo } = require('../models')

const authorize = function (req, res, next) {
  const userId = +req.currentUser.id
  const todoId = +req.params.id
  Todo.findByPk(todoId)
  .then(todo => {
    if(!todo) {
      throw { name: 'custom error' }
    } else if(todo.UserId !== userId) {
      throw { name: 'custom error' }
    } else {
      next()
    }
  })
  .catch(err => {
    next(err)
  })
}

module.exports = {
  authorize
}