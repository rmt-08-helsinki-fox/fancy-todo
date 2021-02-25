const { Todo } = require('../models')

const authorize = function authorization(req, res, next) {
    const TodoId = +req.params.id
    Todo.findByPk(TodoId)
    .then(todo => {
        if (todo.UserId === req.decoded.id){
            next()
        } else {
            throw {name: 'CustomError', msg: 'Not authorized', status: 401}
        }
    })
    .catch(error => {
      next(error)

    })
}

module.exports = authorize