const { Todo } = require('../models/')

class TodoController {
  static postTodo(req, res) {
    const { title, description, status, due_date } = req.body
    Todo.create({ title, description, status, due_date })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        if (err.errors) {
          let errorMsg = []
          err.errors.forEach(el => {
            errorMsg.push(el.message)
          })
          res.status(400).json({ errorMsg })
        }
        res.status(500).json('Internal Server Error')
      })
  }

  static getTodos(req, res) {
    Todo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json('Internal Server Error')
      })
  }

  static getTodoById(req, res) {
    Todo.findOne({
      where: {
        id: +req.params.id
      }
    })
      .then(data => {
        if (!data) {
          const errorMsg = 'Error Not Found'
          res.status(404).json({ errorMsg })
        }
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json('Internal Server Error')
      })
  }

  static updateTodo(req, res) {
    const { title, description, status, due_date } = req.body
    Todo.update({ title, description, status, due_date }, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
      .then(data => {
        if (!data[1][0]) {
          const errorMsg = 'Error Not Found'
          res.status(404).json({ errorMsg })
        }
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        if (err.errors) {
          let errorMsg = []
          err.errors.forEach(el => {
            errorMsg.push(el.message)
          })
          res.status(400).json({ errorMsg })
        }
        res.status(500).json('Internal Server Error')
      })
  }

  static updateStatusTodo(req, res) {
    const { status } = req.body
    Todo.update({ status }, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
      .then(data => {
        if (!data[1][0]) {
          const errorMsg = 'Error Not Found'
          res.status(404).json({ errorMsg })
        }
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        if (err.errors) {
          let errorMsg = []
          err.errors.forEach(el => {
            errorMsg.push(el.message)
          })
          res.status(400).json({ errorMsg })
        }
        res.status(500).json('Internal Server Error')
      })
  }

  static deleteTodo(req, res) {
    Todo.destroy({
      where: {
        id: +req.params.id
      }
    })
      .then((data) => {
        if (!data) {
          const errorMsg = 'Error Not Found'
          res.status(404).json({ errorMsg })
        }
        res.status(200).json('Todo Success to Delete')
      })
      .catch(err => {
        res.status(500).json('Internal Server Error')
      })
  }

}

module.exports = TodoController