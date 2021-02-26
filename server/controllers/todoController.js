const { Todo } = require('../models')
const axios = require('axios')

class TodoController {
  static addTodo(req, res, next) {
    const { title, description, status, due_date, } = req.body
    const dataTodo = { title, description, status, due_date, UserId: req.currentUser.id }
    Todo.create(dataTodo)
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(err => {
      next(err)
    })
  }

  static showTodo(req, res, next) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        next(err)
      })
  }

  static showNews(req, res, next) {
    axios({
      method: 'GET',
      url: `http://newsapi.org/v2/top-headlines?country=id&apiKey=${process.env.APIKEY}`
    })
      .then(news => {
        res.status(200).json({
          dataAPI: news.data.articles.map(el => ({
            title: el.title,
            publishedAt: el.publishedAt
          }))
        })
      })
      .catch(err => {
        next(err)
      })
  }
  
  static showById(req, res, next) {
    const todoId = +req.params.id
    Todo.findByPk(todoId)
    .then(todo => {
      if (todo !== null) {
        res.status(200).json(todo)
        
      } else {
        next({
          message: 'data not found'
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateById(req, res, next) {
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
      next(err)
    })
  }
    
  static updateByPatch(req, res, next) {
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
      next(err)
    })
  }

  static deleteTodo(req, res, next) {
    const todoId = +req.params.id
    Todo.destroy({
      where: {
        id: todoId
      }
    })
    .then(todo => {
      if (!todo) {
        next({
          message: 'data not found'
        })
      } else {
        res.status(200).json({ message: 'Todo success to delete' })
      }
    })
    .catch(err => {
      res.json(err)
    })
  }
}

module.exports = TodoController;