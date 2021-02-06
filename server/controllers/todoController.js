const { Todo } = require("../models");
const Anime = require("../helpers/anime")

module.exports = class TodoController {

  static async getTodos(req, res, next) {
    try {
      const todos = await Todo.findAll({ order: [["createdAt", "DESC"]] })
      res.status(200).json(todos)
    } catch (err) {
      next(err)
    }
  }


  static async addTodo(req, res, next) {
    try {
      let { title, description, status, due_date } = req.body;
      let userId = req.payload.id;
      const createTodo = await Todo.create({ title, description, status, due_date, userId }, { returning: true })
      res.status(201).json(createTodo)
    } catch (err) {
      next(err)
    }
  }

  static async getTodo(req, res, next) {
    try {
      console.log(req.params.id)
      let id = Number(req.params.id);
      const todo = await Todo.findOne({ where: { id } })
      if(!todo) { throw { name: "Not Found", message: "todo not found", status: 404 } }
      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async putTodo(req, res, next) {
    try {
      let newTodo = req.body;
      let id = Number(req.params.id);
      const updatedTodo = await Todo.update(newTodo, { where: { id }, returning: true })
      if(!updatedTodo[0]) { throw { name: "Not Found", message: "todo not found", status: 404 } }
      res.status(200).json(updatedTodo[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async patchTodo(req, res, next) {
    try {
      let { status } = req.body;
      let id = Number(req.params.id);
      console.log(status, id)
      const patchedTodo = await Todo.update({ status }, { where: { id }, returning: true })
      console.log(patchedTodo[1])
      if(!patchedTodo[0]) { throw { name: "Not Found", message: "todo not found", status: 404 } }
      res.status(200).json(patchedTodo[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      console.log(req.params, "ini di controller")
      let id = Number(req.params.id);
      const deletedTodo = await Todo.destroy({ where: { id } })
      if(!deletedTodo) { throw { name: "Not Found", message: "todo not found", status: 404 } }
      res.status(200).json({ message: "todo success to delete" })
    } catch (err) {
      next(err)
    }
  }
}