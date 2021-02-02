const { Todo } = require('../models')

class TodoController {
  static createTodos(req, res) {
    const { title, description, status, due_date } = req.body
    const userId = req.token.id
    Todo.create({
      title,
      description,
      status,
      due_date,
      userId
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        let error = 'Internal Server Error';
        let status = 500;
        if (err.name === 'SequelizeValidationError') {
          error = []
          err.errors.forEach(element => {
            error.push(element.message)
          });
          status = 400
        }
        res.status(status).json({ error })
      })
  }
  static findTodos(req, res) {
    Todo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static findTodosById(req, res) {
    let id = req.params.id
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
        res.status(status).json({ error })
      })
  }
  static editTodos(req, res) {
    const id = req.params.id
    const { title, description, status, due_date } = req.body
    Todo.update({ title, description, status, due_date }, {
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
        let error
        let status
        if (err.name === 'SequelizeValidationError') {
          error = []
          err.errors.forEach(element => {
            error.push(element.message)
          });
          status = 400
        } else {
          error = err.error || 'Internal Server Error'
          status = err.status || 500
        }
        res.status(status).json({ error })
      })
  }
  static editStatusTodos(req, res) {
    const id = req.params.id
    const { status } = req.body
    Todo.update({ status }, {
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
        let error
        let status
        if (err.name === 'SequelizeValidationError') {
          error = []
          err.errors.forEach(element => {
            error.push(element.message)
          });
          status = 400
        } else {
          error = err.error || 'Internal Server Error'
          status = err.status || 500
        }
        res.status(status).json({ error })
      })
  }
  static deleteTodo(req, res) {
    const id = req.params.id
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
        res.status(status).json({ error })
      })
  }
}

module.exports = TodoController