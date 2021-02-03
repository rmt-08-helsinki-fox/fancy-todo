const { Todo } = require('../models')

class TodoController {
  static add(req, res, next) {
    const activeUser = Number(req.decoded.id)
    const { title, description, status, dueDate } = req.body
    Todo.create({
      title,
      description,
      status,
      dueDate: dueDate,
      UserId: activeUser
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static showAll(req, res, next) {
    const activeUser = Number(req.decoded.id)
    Todo.findAll({
      where: {
        UserId: activeUser
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static findById(req, res, next) {
    const targetedId = Number(req.params.todoId)
    Todo.findOne({
      where: {
        id: targetedId
      }
    })
      .then(data => {
        if (!data) throw { name: 'DATA_NOT_FOUND' }
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    const targetedId = Number(req.params.todoId)
    const { title, description, status, dueDate } = req.body
    Todo.update({
      title: title,
      description: description,
      status: status,
      dueDate: dueDate
    }, {
      where: {
        id: targetedId
      },
      returning: true
    })
      .then(data => {
        if (!data[0]) throw { name: 'DATA_NOT_FOUND' }
        res.status(201).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static updateStatus(req, res, next) {
    const targetedId = Number(req.params.todoId)
    const { status } = req.body
    Todo.update({
      status: status
    }, {
      where: {
        id: targetedId
      },
      returning: true
    })
      .then(data => {
        if (!data[0]) throw { name: 'DATA_NOT_FOUND' }
        res.status(201).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    const targetedId = Number(req.params.todoId)
    Todo.destroy({
      where: {
        id: targetedId
      },
      returning: true
    })
      .then(data => {
        if (!data) throw { name: 'DATA_NOT_FOUND' }
        let msg = "Successfully delete one To-do"
        res.status(200).json({ msg })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TodoController