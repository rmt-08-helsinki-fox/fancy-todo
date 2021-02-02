const { Todo } = require('../models')

const authorize = (req, res, next) => {
  const TodoId = +req.params.id
  const UserId = req.decode.id

  Todo.findByPk(TodoId)
  .then(todo => {
    todo.UserId === UserId ? next() : res.status(401).json({
      message: 'Not authorize'
    })
  })
  .catch(err => {
    res.status(500).json({message: 'Internal server error'})
  })
}

module.exports = authorize