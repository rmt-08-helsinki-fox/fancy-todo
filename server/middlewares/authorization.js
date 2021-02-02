const jwt = require('jsonwebtoken')
const { Todo } = require('../models/')

const authorization = (req, res, next) => {
  const idTodo = req.params.id
  const idUser = req.token.id
  Todo.findOne({
    where: {
      id: +idTodo
    }
  })
    .then(data => {
      if (!data) next()
      else if (data.userId === idUser) next()
      else throw { error: 'Invalid Token', status: 401 }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization