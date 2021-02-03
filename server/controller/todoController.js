const { Todo, User } = require('../models')

class Controller {

  static createTodo (req, res, next) {
    let { title, description, due_date } = req.body
    let UserId = req.headers.UserId
    Todo.create({ title, description, due_date, UserId })
      .then(todo => {
        res.status(201).json({ todo })
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllTodos (req, res, next) {
    Todo.findAll({ order: [['createdAt', 'ASC']],include: [{ model: User, attributes: ['id', 'email'] }]})
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static getOneTodo (req, res, next) {
    let id = req.params.id
    Todo.findOne({ where: { id: id }})
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateTodo (req, res, next) {
    let { title, description, due_date } = req.body
    let id = req.params.id
    Todo.update({ title, description, due_date }, { where: { id: id }, returning: true })
      .then(todo => {
        if (todo[0] == 1) {
          res.status(200).json(todo[1][0])
        } else {
          throw ({ name: 404 })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  static changeStatusTodo (req, res, next) {
    let id = req.params.id
    let status = req.body.status
    Todo.update({ status }, { where: { id: id }, returning: true })
      .then(todo => {
        console.log(todo)
        if (todo[0] == 1) {
          res.status(200).json(todo[1][0])
        } else {
          throw ({ name: 404})
        }
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static deleteTodo (req, res, next) {
    let id = req.params.id
    Todo.destroy({ where: { id: id }})
      .then(() => {
        res.status(200).json({ message: 'delete succeed' })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = Controller