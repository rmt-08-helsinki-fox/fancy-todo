const { Todo } = require("../models")

const authorize = (req, res, next) => {
  Todo.findOne({
    where: {
      id: req.params.id
    }
  }).then(todo => {
    
    if (todo === null) {
      throw {name: "customError", message: "Error not found"}
    }
    if (req.decoded.id === todo.UserId) {
      next()
    } else {
      throw {name: "NotAuthorized", message: "You are not authorized to access the file"}
    }
  }).catch(err => {
    next(err)
  })
}

module.exports = authorize