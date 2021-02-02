const { Todo } = require('../models')
const axios = require('axios')
const APIKEY = process.env.APIKEY

class TodoController {
  static addTodo(req, res) {
    const { title, description, status, due_date } = req.body
    const dataTodo = { title, description, status, due_date }
    Todo.create(dataTodo)
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static showTodo(req, res) {
    let dataTodos = null
    Todo.findAll()
    .then(todos => {
      dataTodos = todos
      const url = `http://newsapi.org/v2/top-headlines?country=id&apiKey=${APIKEY}`
      return axios({
        method: 'get',
        url
      })
    })
    .then(axiosData => {
      res.status(200).json({
        todos: dataTodos,
        dataAPI: axiosData.data.articles.map(el => ({
          title: el.title,
          publishedAt: el.publishedAt
        }))
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  
  static showById(req, res) {
    const todoId = +req.params.id
    Todo.findByPk(todoId)
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      res.status(404).json(err)
    })
  }

  static updateById(req, res) {
    const todoId = +req.params.id
    const { title, description, status, due_date } = req.body
    const dataTodo = { title, description, status, due_date }
    Todo.update(dataTodo, {
      where: {
        id: todoId
      },
      returning: true
    })
    .then(todo => {
      res.status(200).json(todo[1][0])
    })
    .catch(err => {
      res.json(err)
    })
  }
    

  static updateByPatch(req, res) {
    const todoId = +req.params.id
    const { status } = req.body
    const data = { status }
    Todo.update(data, {
      where: {
        id: todoId
      },
      returning: true
    })
    .then(data => {
      res.status(200).json(data[1][0])
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static deleteTodo(req, res) {
    const todoId = +req.params.id
    Todo.destroy({
      where: {
        id: todoId
      }
    })
    .then(() => {
      res.status(200).json({ message: 'Todo success to delete' })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = TodoController;