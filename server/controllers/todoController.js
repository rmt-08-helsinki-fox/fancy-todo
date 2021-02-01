const { Todo } = require('../models')

class TodoController {
  static createTodos(data, res) {
    Todo.create(data)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          res.status(400).json(err)
        } else {
          res.status(500).json(err)
        }
      })
  }
  static findTodos(res) {
    Todo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static findTodosById(id, res) {
    Todo.findOne({
      where: {
        id: +id
      }
    })
      .then(data => {
        if (!data) throw { error: 'Not Found', status: 404 }
        res.status(200).json(data)
      })
      .catch(err => {
        const error = err.error || 'Internal Server Error'
        const status = err.status || 500
        res.status(status).json(error)
      })
  }
  static editTodos(id, data, res) {
    Todo.update(data, {
      where: {
        id: +id
      },
      returning: true
    })
      .then(data => {
        if (!data[0]) throw { error: 'Not Found', status: 404 }
        res.status(200).json(data[1])
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          res.status(400).json(err.errors)
        } else {
          const error = err.error || 'Internal Server Error'
          const status = err.status || 500
          res.status(status).json(error)
        }
      })
  }
  static editStatusTodos(id, data, res) {
    Todo.update(data, {
      where: {
        id: +id
      },
      returning: true
    })
      .then(data => {
        if (!data[0]) throw { error: 'Not Found', status: 404 }
        res.status(200).json(data[1])
      })
      .catch(err => {
        const error = err.error || 'Internal Server Error'
        const status = err.status || 500
        res.status(status).json(error)
      })
  }
  static deleteTodo(id, res) {
    Todo.destroy({
      where: {
        id: +id
      }
    })
      .then(data => {
        if (!data) throw { error: 'Not Found', status: 404 }
        res.status(200).json({ message: 'todo success to delete' })
      })
      .catch(err => {
        const error = err.error || 'Internal Server Error'
        const status = err.status || 500
        res.status(status).json(error)
      })
  }
}

module.exports = TodoController