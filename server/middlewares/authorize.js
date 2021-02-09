const { Todo } = require("../models")

const authorize = (req, res, next) => {
  const id = req.params.id
  Todo.findOne({
    where: {
      id
    }
  })
    .then(todo => {
      if (!todo) {
        throw {
          name: "customError",
          msg: "error not found",
          status: 404
        }
      }

      if (todo.UserId !== req.decoded.id) {
        throw {
          name: "customError",
          msg: "Unauthorized Access",
          status: 401
        }
      }
      next()
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorize