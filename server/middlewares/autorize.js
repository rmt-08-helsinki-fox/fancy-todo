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
      throw {name: "customError", message: "Not authorized"}
    }
  }).catch(err => {
    // res.status(500).json(err)
    next(err)
  })
}

module.exports = authorize