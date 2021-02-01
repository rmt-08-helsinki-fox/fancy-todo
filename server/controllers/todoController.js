const { Todo } = require("../models")

module.exports = class todoController {
  static addTodo(req, res) {
    const { title, description, due_date } = req.body
    Todo.create({ title, description, due_date })
      .then(todo => {
        res.status(201).json(todo)
      })
  }
}