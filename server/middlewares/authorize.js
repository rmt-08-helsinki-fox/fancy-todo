const { User, Todo } = require("../models")

module.exports = async function (req, _, next) {
  try {
    let id = req.params.id

    const todo = await Todo.findByPk(id)

    if (!todo) throw { name: "error_404_todo_not_found" }
    if (todo.UserId !== req.decoded.id) throw { name: "error_403_todo_forbidden" }

    req.todo = todo

    next()
  } catch (err) {
    next(err)
  }

}