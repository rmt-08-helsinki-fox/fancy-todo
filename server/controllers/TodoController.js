const { Todo } = require('../models')

class TodoController {
  static addTodo(req, res) {
    const obj = { 
      title: req.body.title,
      description: req.body.description, 
      status: req.body.status, 
      due_date: req.body.due_date 
    }
    Todo.create(obj)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        res.status(400).json({
          msg : 'Can not Choose Past Date'
        })
      } else {
        res.status(500).json({
          msg : 'Internal Server Error'
        })
      }
    })
  }

  static showTodos(req, res) {
    Todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({
        msg : 'Internal Server Error'
      })
    })
  }

  static showTodoId(req, res) {
    Todo.findByPk(+req.params.id)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({
          msg : 'Error not Found'
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        msg : 'Internal Server Error'
      })
    })
  }

  static editTodo(req, res) {
    const obj = { 
      title: req.body.title, 
      description: req.body.description, 
      status: req.body.status, 
      due_date: req.body.due_date 
    }
    Todo.update(obj, {
      where: {
        id : +req.params.id
      }
    })
    .then(() => {
      return Todo.findByPk(+req.params.id)
    })
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({
          msg : 'Error not Found'
        })
      }
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        res.status(400).json({
          msg : 'Can not Choose Past Date'
        })
      } else {
        res.status(500).json({
          msg: 'Internal Server Error'
        })
      }
    })
  }

  static editStatusTodo(req, res) {
    Todo.update(req.body.status, {
      where: {
        id : +req.params.id
      }
    })
    .then(() => {
      return Todo.findByPk(+req.params.id)
    })
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({
          msg : 'Error not Found'
        })
      }
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        res.status(400).json({
          msg : 'Can not Choose Past Date'
        })
      } else {
        res.status(500).json({
          msg : 'Internal Server Error'
        })
      }
    })
  }

  static deleteTodo(req, res) {
    Todo.destroy({
      where: {
        id : +req.params.id
      }
    })
    .then(data => {
      if (data) {
        res.status(200).json({
          msg : 'Todo Success to Delete'
        })
      } else {
        res.status(404).json({
          msg : 'Error not Found'
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        msg : 'Internal Server Error'
      })
    })
  }
}

module.exports = TodoController