const { Todo } = require('../models')

const authorize = (req, res, next) => {
  const TodoId = +req.params.id
  const UserId = req.decode.id

  Todo.findByPk(TodoId)
  .then(todo => {
    if(!todo) {
      throw {name: 'customError', msg: 'Not found'}
    }
    todo.UserId === UserId ? next() : res.status(401).json({
      message: 'Not authorize'
    })
  })
  .catch(err => {
    next(err)
  })
}

module.exports = authorize