const { Todo } = require('../models/')

const authorize = function (req, res, next) {
  Todo.findByPk(req.params.id)
    .then(todo => {
      if (!todo) {
        throw { error: "not found", status: 404 }
      } else if (req.decoded.id != todo.UserId) {
        throw { message: "Not authorized", status: 401 }
      } else if (req.decoded.id == todo.UserId) {
        next()
      }
    })
    .catch(err => {
      const error = err || 'Internal server error'
      res.status(500).json(error)
    })
}

module.exports = authorize