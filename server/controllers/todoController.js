const { Todo } = require("../models")
const axios = require("axios")

class TodoController {

  static async addTodo(req, res, next) {
    try {
      let { title, description, status, due_date, UserId } = req.body
      let input = { title, description, status, due_date, UserId }

      const newTodo = await Todo.create(input, { returning: true })

      res.status(201).json(newTodo)
    } catch (err) {
      next(err)
    }
  }

  static async list(req, res, next) {
    try {
      const UserId = req.decoded.id
      const todos = await Todo.findAll({ where: { UserId }, order: [["id"]] })

      res.status(200).json(todos)
    } catch (err) {
      next(err)
    }
  }

  static async findTodo(req, res, next) {
    try {
      const todo = req.todo

      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async updateTodo(req, res, next) {
    try {
      let { title, description, status, due_date, UserId } = req.body
      let input = { title, description, status, due_date, UserId }
      const id = req.params.id

      const data = await Todo.update(input, { where: { id }, returning: true })
      if (!data[0]) throw { name: "error_404_todo_not_found" }

      const todo = data[1][0]

      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async updateTodoStatus(req, res, next) {
    try {
      let { status } = req.body
      let input = { status }
      const id = req.params.id

      const data = await Todo.update(input, { where: { id }, returning: true })
      if (!data[0]) throw { name: "error_404_todo_not_found" }

      const todo = data[1][0]

      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const id = req.params.id
      const todo = req.todo

      const deletedRows = await Todo.destroy({ where: { id } })
      if (!deletedRows) throw { name: "error_404_todo_not_found" }

      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async weather(req, res, next) {
    const apiURL = `https://api.currentsapi.services/v1/latest-news?country=ID&apiKey=6cHyeWL2ZD3W4RK5yf1fnRFHWZV-5sUZosV2I0r4_f3tOB66`
    axios
      .get(apiURL)
      .then(response => {
        const news = response.data.news.slice(0, 3).map(el => {
          return {
            title: el.title,
            published: el.published,
            url: el.url,
            image: el.image
          }
        })
        res.status(200).json(news)
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TodoController