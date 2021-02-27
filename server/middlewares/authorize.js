const { Todo } = require('../models')

const authorize = (req, res, next) => {
  
  const todoId = +req.params.id;
  const userId = +req.decoded.id;

  Todo.findOne({
    where: {
      id: todoId
    }
  })
  .then((todo) => {
    if (!todo) throw { name: 'CustomError', error: 'Todo Not Found', status: 404 }
    if (todo.UserId === userId) {
      next()
    } else {
      throw { name: 'CustomError',  error: 'Not Authorize', status: 401}
    }
  })
  .catch((err) => {
    next(err)
  })

}

module.exports = authorize;