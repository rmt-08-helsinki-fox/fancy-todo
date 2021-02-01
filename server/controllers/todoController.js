const { Todo } = require('../models/index.js')

class Controller {
  static postTodo(req, res) {
    let inputData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo
      .create(inputData)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        if (err.message) {
          res.status(400).json(err.message)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static getTodo(req, res) {
    Todo
      .findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static getTodoById(req, res) {
    let checkParams = req.params.id
    Todo
      .findOne({
        where: {
          id: +checkParams
        }
      })
      .then((data) => {
        if (!data) {
          res.status(404).json('Error not found')
        } else {
          res.status(200).json(data)
        }
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static putTodoUpdate(req, res) {
    let checkParams = req.params.id
    let inputData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
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
        if (data[1].length === 0) {
          res.status(404).json('Error not found')
        } else {
          res.status(200).json(data[1][0])
        }
      })
      .catch((err) => {
        if (err.message) {
          res.status(400).json(err.message)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static patchTodoUpdate(req, res) {
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
        if (data[1].length === 0) {
          res.status(404).json('Error not found')
        } else {
          res.status(200).json(data[1][0])
        }
      })
      .catch((err) => {
        if (err.message) {
          res.status(400).json(err.message)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static deleteTodo(req, res) {
    let checkParams = req.params.id
    Todo
      .destroy({
        where: {
          id: +checkParams
        }
      })
      .then((data) => {
        if (data[1].length === 0) {
          res.status(404).json('Error not found')
        } else {
          res.status(200).json('todo success to delete')
        }
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }
}

module.exports = Controller