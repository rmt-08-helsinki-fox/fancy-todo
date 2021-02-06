const { Todo } = require('../models')

class todoController {
  static async readAll (req, res, next) {
    try {
      const UserId = req.user.id
      const read = await Todo.findAll({ where: { UserId } })
      if (read.length == 0){
        res.status(200).json({
          msg: 'Welcome, add your todo'
        })
      } else {
        res.status(200).json(read)
      }
    } catch (err) {
      next(err)
    }
  }
  static async readById (req, res, next) {
    try {
      res.status(200).json(req.todo)
    } catch (err) {
      next(err)
    }
  }
  static async createTodo (req, res, next) {
    const { title, description, status, due_date } = req.body
    const UserId = req.user.id
    try {
      const create = await Todo.create({
        title,
        description,
        status,
        due_date,
        UserId
      })
      res.status(201).json(create)
    } catch (err) {
      next(err)
    }
  }
  static async putTodo (req, res, next) {
    const id = +req.params.id
    const { title, description, status, due_date } = req.body
    try {
      const update = await Todo.update({
        title,
        description,
        status,
        due_date
      }, {where: { id }, returning:true})
      res.status(200).json(update[1][0])
    } catch (err) {
      next(err)
    }
  }
  static async patchTodo (req, res, next) {
    const id = +req.params.id
    const status = req.body.status
    try {
      const updated = await Todo.update(
        { status }, {where: { id }, returning: true}
      )
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  }
  static async deleteTodo (req, res, next) {
    const id = +req.params.id
    try {
      const remove = await Todo.destroy({
        where: { id }
      })
      res.status(200).json({
        msg: 'Todo was deleted'
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = todoController