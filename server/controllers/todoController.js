const { Todo } = require('../models')

class TodoController {
  static postTodo(req, res, next) {
    const { title, description, due_date } = req.body
    Todo.create({ title, description, due_date, UserId: req.decoded.id })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getTodos(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.decoded.id
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getTodoById(req, res, next) {
    Todo.findOne({
      where: {
        id: +req.params.id
      }
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static updateTodo(req, res, next) {
    const { title, description, status, due_date } = req.body
    Todo.update({ title, description, status, due_date }, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static updateStatusTodo(req, res, next) {
    const { status } = req.body
    Todo.update({ status }, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTodo(req, res, next) {
    Todo.destroy({
      where: {
        id: +req.params.id
      }
    })
      .then(() => {
        res.status(200).json('Todo Success to Delete')
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TodoController