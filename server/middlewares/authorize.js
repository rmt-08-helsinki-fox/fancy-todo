const { Todo } = require('../models')

const authorize = function (req, res, next) {
  const UserId = Number(req.decoded.id)
  const TodoId = Number(req.params.todoId)
  Todo.findOne({
    where: {
      id: TodoId
    }
  })
    .then(result => {
      if (!result) {
        throw { name: 'DATA_NOT_FOUND' }
      } else {
        if (result.UserId !== UserId) {
          throw { name: 'NOT_AUTHORIZED' }
        } else {
          next()
        }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { authorize }