const { Todo } = require("../models")

module.exports = class todoController {
  static addTodo(req, res) {
    const { title, description, status, due_date } = req.body
    Todo.create({ title, description, status, due_date })
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(err => {
        if (err.errors) {
          res.status(400).json(err.errors)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static showTodos(req, res) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static showTodo(req, res) {
    const id = +req.params.id
    Todo.findByPk(id)
      .then(todo => {
        if (!todo) {
          throw { error: "not found" }
        }
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }

  static editTodo(req, res) {
    const id = +req.params.id
    const { title, description, status, due_date } = req.body

    Todo.update({ title, description, status, due_date }, {
      where: {
        id
      },
      returning: true,
    })
      .then(todo => {
        if (!todo[0]) {
          throw { msg: "error not found" }
        }
        res.status(200).json(todo[1])
      })
      .catch(err => {
        if (err.msg) {
          res.status(404).json(err)
        } else if (err.name === "SequelizeValidationError") {
          res.status(400).json(err)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static editTodoStatus(req, res) {
    const id = +req.params.id
    const { status } = req.body

    Todo.update({ status }, {
      where: {
        id
      },
      returning: true
    })
      .then(todo => {
        if (!todo[0]) {
          throw { msg: "error not found" }
        }
        res.status(200).json(todo[1])
      })
      .catch(err => {
        if (err.msg) {
          res.status(404).json(err)
        } else if (err.name === "SequelizeValidationError") {
          res.status(400).json(err)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static deleteTodo(req, res) {
    const id = +req.params.id

    Todo.destroy({ where: { id } })
      .then(data => {
        if (!data) {
          throw { msg: "error not found" }
        }
        res.status(200).json({ message: "todo success to delete" })
      })
      .catch(err => {
        if (err.msg) {
          res.status(404).json(err)
        } else {
          res.status(500).json(err)
        }
      })
  }
}