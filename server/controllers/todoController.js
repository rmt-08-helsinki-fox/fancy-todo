const { User, Todo, UserTodo } = require("../models");
const Anime = require("../helpers/anime")

module.exports = class TodoController {

  static async getTodos(req, res, next) {
    try {
      const todos = await Todo.findAll({ order: [["createdAt", "DESC"]], include: [UserTodo, User] })
      res.status(200).json(todos)
    } catch (err) {
      next(err)
    }
  }

  static async getMembers(req, res, next) {
    try {
      const rawUsers = await User.findAll()
      const todoId = Number(req.params.id)
      const users = rawUsers.map(user => user.email);
      const todoMember = UserTodo.findAll({ where: { todoId } })
      console.log(users, todoMember)
    } catch (err) {
      next(err);
    }
  }

  static async addMember(req, res, next) {
    try {
      const userTodo = await UserTodo.update({ member_email: req.body.member_email }, { where: { todoId: req.body.todoId } })
      res.status(200).json({})
    } catch (err) {
      next(err);
    }
  }

  static async addTodo(req, res, next) {
    try {
      let { title, description, status, due_date } = req.body;
      let userId = req.payload.id;
      const todo = await Todo.create({ title, description, status, due_date }, { returning: true })
      await UserTodo.create({ userId, todoId: todo.id }, { returning: true })
      res.status(201).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async getTodo(req, res, next) {
    try {
      let id = Number(req.params.id);
      const todo = await Todo.findOne({ where: { id }, include: [User,UserTodo] })
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
      const patchedTodo = await Todo.update({ status }, { where: { id }, returning: true })

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