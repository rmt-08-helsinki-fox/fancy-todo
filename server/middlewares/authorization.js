const jwt = require('jsonwebtoken')
const { Todo } = require('../models/')

const authorization = (req, res, next) => {
  const idTodo = req.params.id
  const idUser = req.access_token.id
  Todo.findByPk(+idTodo)
    .then(data => {
      if (!data) throw { error: 'Invalid Token', status: 401 }
      else if (data.userId === idUser) next()
      else throw { error: 'Invalid Token', status: 401 }
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
}

module.exports = authorization