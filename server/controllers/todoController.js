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
      const todos = await Todo.findAll({ where: { UserId } })

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
    try {
      const city = req.query.city || ""

      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_APIKEY}`)
      const localweather = {
        weather: response.data.weather[0].main,
        temp: response.data.main.temp,
        city: response.data.name
      }

      res.status(200).json(localweather)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = TodoController