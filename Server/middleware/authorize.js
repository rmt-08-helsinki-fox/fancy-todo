const {TODO} = require("../models/")

const authorize = function(req, res, next) {
  let todoId = +req.params.id

  TODO.findOne({
    where: {
      id: todoId
    }
  })
  .then(todo => {
    // console.log(todo, "THIS TO DO IS INSIDE AUTHORIZE")
    if(!todo) {
      res.status(404).json({ msg: "User ID not found"})
    }
    if(todo.userId === req.decoded.id) {
      next()
    } else {
      const error = err.msg || "Unauthorized user access"
      res.status(500).json({error})
    }
  })
  .catch(err => {
    next(err)
  })
}
module.exports = authorize
