const { Todo } = require('../models')

class TodoController {
  static addTodo(req, res, next) {
    const UserId = req.user.id
    const { title, description, status, due_date } = req.body
    const obj = { title, description, status, due_date, UserId } 
    Todo.create(obj)
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(err => {
      next(err)
    })
  }

  static showTodos(req, res, next) {
    Todo.findAll({
      order: [['id', 'ASC']], 
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    .then(todo => {
      return res.status(200).json(todo)
    })
    .catch(err => {
      next(err)
    })
  }

  static showTodoId(req, res, next) {
    const id = +req.params.id
    Todo.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    .then(todo => {
      return res.status(200).json(todo)
    })
    .catch(err => {
      next(err)
    })
  }

  static editTodo(req, res, next) {
    const id = +req.params.id
    const { title, description, status, due_date } = req.body
    const obj = { title, description, status, due_date }
    Todo.update(obj, {
      where: {
        id
      }, 
      returning: true, 
      plain: true
    })
    .then(todo => {
      if (todo) {
        return res.status(200).json(todo[1])
      }
      next({
        name: 'resourceNotFound'
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static editStatusTodo(req, res, next) {
    const id = +req.params.id
    const status = { status: req.body.status }
    Todo.update(status, {
      where: {
        id
      }, 
      returning: true, 
      plain: true
    })
    .then(todo => {
      if (todo) {
       return res.status(200).json(todo[1])
      }
      next({
        name: 'resourceNotFound'
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteTodo(req, res, next) {
    const id = +req.params.id
    Todo.destroy({
      where: {
        id
      }
    })
    .then(todo => {
      if (todo) {
        return res.status(200).json({
          message: 'Todo Success to Delete'
        })
      }
      next({
        name: 'resourceNotFound'
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = TodoController