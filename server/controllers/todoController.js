const { Todo } = require('../models/index.js')

class Controller {
  static postTodo(req, res, next) {
    let inputData = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      UserId: req.decoded.id
    }

    Todo
      .create(inputData)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static getTodo(req, res, next) {
    Todo
      .findAll({
        where: {
          UserId: req.decoded.id
        },
        order: [['id', 'ASC']]
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static getTodoById(req, res, next) {
    let checkParams = req.params.id
    Todo
      .findOne({
        where: {
          id: +checkParams
        }
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static putTodoUpdate(req, res, next) {
    let checkParams = req.params.id
    let inputData = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date
    }
    Todo
      .update(inputData, {
        where: {
          id: +checkParams
        },
        returning: true
      })
      .then((data) => {
        res.status(200).json(data[1][0])
      })
      .catch((err) => {
        next(err)
      })
  }

  static patchTodoUpdate(req, res, next) {
    let checkParams = req.params.id
    let inputData = {
      status: req.body.status
    }
    Todo
      .update(inputData, {
        where: {
          id: +checkParams
        },
        returning: true
      })
      .then((data) => {
        res.status(200).json(data[1][0])
      })
      .catch((err) => {
        next(err)
      })
  }

  static deleteTodo(req, res, next) {
    let checkParams = req.params.id
    Todo
      .destroy({
        where: {
          id: +checkParams
        }
      })
      .then((data) => {
        res.status(200).json('todo success to delete')
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller