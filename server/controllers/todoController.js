const { Todo } = require("../models")

module.exports = class TodoController {
  static addTodo(req, res, next) {
    const { title, description, status, due_date } = req.body
    const UserId = req.decoded.id
    Todo.create({ title, description, status, due_date, UserId })
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static showTodos(req, res, next) {
    const UserId = req.decoded.id
    Todo.findAll({ where: { UserId } })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        next(err)
      })
  }

  static showTodo(req, res, next) {
    const id = +req.params.id
    const UserId = req.decoded.id
    Todo.findByPk(id)
      .then(todo => {
        if (!todo) {
          throw {
            name: "customError",
            msg: "error not found",
            status: 404
          }
        }
        res.status(200).json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static editTodo(req, res, next) {
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
          throw {
            name: "customError",
            msg: "error not found",
            status: 404
          }
        }
        res.status(200).json(todo[1])
      })
      .catch(err => {
        next(err)
      })
  }

  static editTodoStatus(req, res, next) {
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
          throw {
            name: "customError",
            msg: "error not found",
            status: 404
          }
        }
        res.status(200).json(todo[1])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTodo(req, res, next) {
    const id = +req.params.id

    Todo.destroy({ where: { id } })
      .then(data => {
        if (!data) {
          throw {
            name: "customError",
            msg: "error not found",
            status: 404
          }
        }
        res.status(200).json({ message: "todo success to delete" })
      })
      .catch(err => {
        next(err)
      })
  }
}