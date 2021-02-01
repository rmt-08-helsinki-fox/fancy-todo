const { Todo } = require('../models')

class TodoController {
  static async postTodo(req, res) {
    try {
      const { title, description, status, due_date } = req.body
      let newTodo = await Todo.create({
        title,
        description,
        status,
        due_date
      })
      res.status(201).json({newTodo})
    } catch (err) {
      if (err.name === 'SequelizeValidationError'){
        res.status(400).json({err})
      } else {
        res.status(500).json({msg : "Internal server error"})
      }
    }
  }


  static getTodo(req, res) {

  }

  static getTodoById(req, res) {

  }

  static putTodo(req, res) {

  }

  static patchTodo(req, res) {

  }

  static deleteTodo(req, res) {

  }
}

module.exports = TodoController