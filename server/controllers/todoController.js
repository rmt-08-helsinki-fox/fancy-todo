const { Todo } = require('../models')

class TodoController {
  static showAll(req, res, next) {
    Todo.findAll()
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static create(req, res, next) {
    const input = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || false,
      due_date: req.body.due_date,
      userID: req.user.id
    }

    Todo.create(input)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        next(err)
      })
  }

  static showByID(req, res, next) {
    const id = +req.params.id

    Todo.findByPK(id)
      .then(response => {
        if (response) {
          res.status(200).json(response)
        } else {
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    const id = +req.params.id

    const input = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      status: req.body.status
    }

    Todo.update(input, {
      where: { id },
      returning: true
    })
      .then(response => {
        if (response[0] > 0) {
          res.status(200).json(response[1])
        } else {
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateStatus(req, res, next) {
    const id = +req.params.id

    const input = {
      status: req.body.status
    }

    Todo.update(input, {
      where: { id },
      returning: true
    })
      .then(response => {
        res.status(200).json(response[1])
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    const id = +req.params.id

    Todo.destroy({
      where: { id }
    })
      .then(response => {
        if (response) {
          res.status(200).json({
            message: 'Todo deleted successfully'
          })
        } else {
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TodoController;