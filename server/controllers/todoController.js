const { Todo } = require('../models')
const { todoOutputMaker } = require('../helpers')

class Controller {
  static async postTodo(req, res, next) {
    try {
      let todoParams = {
        title: req.body.title,
        description: req.body.description,
        status: false,
        due_date: req.body.due_date,
        UserId: req.userData.userId
      }
      const todo = await Todo.create(todoParams)
      let todoOutput = todoOutputMaker(todo)
      res.status(201).json(todoOutput)
    }
    catch(err) {
      if (!err.name) next(err)
      next({name: err.name, errors: err.errors})
    }
  }

  static async getTodo(req, res, next) {
    try {
      let todos = await Todo.findAll({
        where: {
          UserId: req.userData.userId
        },
        order: [
          ['due_date', 'ASC']
        ]
      })
      todos = todos.map((todo) => {
        return todoOutputMaker(todo)
      })
      res.status(200).json(todos)
    }
    catch(err) {
      console.log(err);
      if (!err.name) next(err)
      next({name: err.name, errors: err.errors})
    }
  }
  
  static async getTodoById(req, res, next) {
    try {
      let { id } = req.params
      let todo = await Todo.findByPk(id)
      let todoOutput = todoOutputMaker(todo)
      res.status(200).json(todoOutput)
    } catch (err) {
      if (!err.name) next(err)
      next({name: err.name, errors: err.errors})
    }
  }
  
  static async putTodo(req, res, next) {
    try {
      let { id } = req.params
      let todoParams = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
      }
      let todo = await Todo.update(todoParams, {
        where: { id },
        returning: true
      })
      let todoOutput = todoOutputMaker(todo[1][0])
      res.status(200).json(todoOutput)
    } catch (err) {
      if (!err.name) next(err)
      next({name: err.name, errors: err.errors})
    }
  }

  static async patchTodo(req, res, next) { //harus diupdate
    try {
      let { id } = req.params
      let { status } = req.body
      let todo = await Todo.update({ status }, {
        where: { id },
        returning: true
      })
      let todoOutput = todoOutputMaker(todo[1][0])
      res.status(200).json(todoOutput)
    } 
    catch (err) {
      if (!err.name) next(err)
      next({name: err.name, errors: err.errors})
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      let { id } = req.params
      let todo = await Todo.destroy({
        where: { id }
      })
      res.status(200).json({ message: "todo success to delete" })
    } 
    catch (err) {
      if (!err.name) next(err)
      next({name: err.name, errors: err.errors})
    }
  }
}
module.exports = Controller