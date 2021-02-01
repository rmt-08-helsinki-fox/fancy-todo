const { Todo } = require('../models')

class Controller {
  static async postTodo(req, res) {
    try {
      let param = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
      }
      const todo = await Todo.create(param)
      let out = {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        due_date: todo.due_date
      }
      res.status(201).json(out)
    }
    catch(err) {
      let error = err.message || "internal server error"
      res.status(500).json(error)
    }
  }

  static async getTodo(req, res) {
    try {
      let todos = await Todo.findAll()
      todos = todos.map((param) => {
        return {
          id: param.id,
          title: param.title,
          description: param.description,
          status: param.status,
          due_date: param.due_date
        }
      })

      res.status(200).json(todos)
    }
    catch(err) {
      let error = err.message || "internal server error"
      res.status(500).json(error)
    }
  }
  
  static async getTodoById(req, res) {
    try {
      let { id } = req.params
      let todo = await Todo.findByPk(id)
      let out = {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        due_date: todo.due_date
      }
      res.status(200).json(out)
    } catch (err) {
      let error = err.message || "internal server error"
      res.status(500).json(error)
    }
  }
  
  static async putTodo(req, res) {
    try {
      let { id } = req.params
      let param = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
      }
      let todo = await Todo.update(param, {
      where: { id },
      returning: true
    })
      let out = {
        id: todo[1][0].id,
        title: todo[1][0].title,
        description: todo[1][0].description,
        status: todo[1][0].status,
        due_date: todo[1][0].due_date
      }
      res.status(200).json(out)
    } catch (err) {
      let error = err.message || "internal server error"
      res.status(500).json(error)
    }
  }

  static async patchTodo(req, res) {
    try {
      let { id } = req.params
      let { status } = req.body
      let todo = await Todo.update({ status }, {
      where: { id },
      returning: true
    })
      let out = {
        id: todo[1][0].id,
        title: todo[1][0].title,
        description: todo[1][0].description,
        status: todo[1][0].status,
        due_date: todo[1][0].due_date
      }
      res.status(200).json(out)
    } catch (err) {
      let error = err.message || "internal server error"
      res.status(500).json(error)
    }
  }

  static async deleteTodo(req, res) {
    try {
      let { id } = req.params
      let todo = await Todo.destroy({
        where: { id }
      })
      res.status(200).json({ message: "todo success to delete" })
    } catch (err) {
      let error = err.message || "internal server error"
      res.status(500).json(error)
    }
  }
}
module.exports = Controller