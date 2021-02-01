const { Todo } = require("../models");

module.exports = class TodoController {

  static async getTodos(req, res) {
    try {
      const todos = await Todo.findAll()
      res.status(200).json(todos)
    } catch (err) {
      res.status(500).json({ errors: "internal server error" })
    }
  }

  static async addTodo(req, res) {
    try {
      let { title, description, status, due_date } = req.body;
      const createTodo = await Todo.create({ title, description, status, due_date }, { returning: true })
      res.status(201).json(createTodo)
    } catch (err) {
      if(err.errors[0].validatorKey === "isBefore") {
        res.status(400).json(err)
      } else {
        res.status(500).json(err)
      }
    }
  }

  static async getTodo(req, res) {
    try {
      let id = Number(req.params.id);
      const todo = await Todo.findByPk(id)
      res.status(200).json(todo)
    } catch (err) {
      res.status(404).json({ errors: "not found" })
    }
  }

  static async putTodo(req, res) {
    try {
      let { title, description, status, due_date } = req.body;
      let id = Number(req.params.id);
      const updatedTodo = await Todo.update({ title, description, status, due_date }, { where: { id }, returning: true })
      if(!updatedTodo[0]) { throw new Error("not found") }
      res.status(200).json(updatedTodo[1][0])
    } catch (err) {
      if(err.message === "not found") {
        res.status(404).json({ errors: err.message })
      } else if(err.errors[0].validatorKey === "isBefore") {
        res.status(400).json(err)
      } else {
        res.status(500).json(err)
      }
    }
  }

  static async patchTodo(req, res) {
    try {
      let { status } = req.body;
      let id = Number(req.params.id);
      const patchedTodo = await Todo.update({ status }, { where: { id }, returning: true })
      if(!patchedTodo[0]) { throw new Error("not found") }
      res.status(200).json(patchedTodo)
    } catch (err) {
      if(err.message === "not found") {
        res.status(404).json({ errors: err.message })
      } else if(err.errors[0].validatorKey === "isBefore") {
        res.status(400).json(err)
      } else {
        res.status(500).json(err)
      }
    }
  }

  static async deleteTodo(req, res) {
    try {
      let id = Number(req.params.id);
      const deletedTodo = await Todo.findByPk(id);
      if(deletedTodo) {
        await Todo.destroy({ where: { id }, returning: true })
        res.status(200).json({ data: deletedTodo, message: "todo success to delete" })
      } else {
        throw new Error("not found")
      }
    } catch (err) {
      if(err.message === "not found") {
        res.status(404).json({ errors: err.message })
      } else {
        res.status(500).json(err)
      }
    }
  }
}