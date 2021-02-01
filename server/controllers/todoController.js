const { Todo } = require('../models')

class TodoController {
  static addTodo(req, res) {
    const { title, description, status, due_date } = req.body
    const data = { title, description, status, due_date }
    Todo.create(data)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static showTodo(req, res) {
    Todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  
  static showById(req, res) {
    const id = +req.params.id
    Todo.findOne({
      where: { id }
    })
    .then(data => {
      // console.log(data);
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json(err)
    })
  }

  static editById(req, res) {
    const id = +req.params.id
    const { title, description, status, due_date } = req.body
    const data = { title, description, status, due_date }
    Todo.update(data, {
      where: { id },
      returning: true
    })
    .then(data => {
      res.status(200).json(data[1][0])
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static editByPatch(req, res) {
    const id = +req.params.id
    const { title, description, status, due_date } = req.body
    const data = { title, description, status, due_date }
    Todo.update(data, {
      where: { id },
      returning: true
    })
    .then(data => {
      res.status(200).json(data[1][0])
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static deleteTodo(req, res) {
    const id = +req.params.id
    Todo.destroy({
      where: { id }
    })
    .then(data => {
      res.status(200).json({ message: 'Todo success to delete' })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = TodoController;