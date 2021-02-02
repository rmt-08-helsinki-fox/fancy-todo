const { Todo } = require('../models')
const axios = require('axios')
const api_key = process.env.Api_Key_Calendarific

class TodoController {
  static createTodos(req, res, next) {
    const { title, description, status, due_date } = req.body
    const userId = req.token.id
    let dataTodo;
    Todo.create({
      title,
      description,
      status,
      due_date,
      userId
    })
      .then(data => {
        dataTodo = data
        let month = data.due_date.split('-')[1]
        return axios.get(`https://calendarific.com/api/v2/holidays?api_key=${api_key}&country=id&year=2021&month=${month}`)
      })
      .then(response => {
        let data = response.data.response.holidays
        let holidays = []
        data.forEach(element => {
          holidays.push({
            name: element.name,
            date: element.date.iso,
            type: element.type
          })
        });
        res.status(201).json({ dataTodo, holidays })
      })
      .catch(err => {
        next(err)
      })
  }
  static findTodos(req, res, next) {
    const userId = req.token.id
    Todo.findAll({
      where: {
        userId: userId
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static findTodosById(req, res, next) {
    let id = req.params.id
    Todo.findOne({
      where: {
        id: +id
      }
    })
      .then(data => {
        if (!data) throw { error: 'Not Found', status: 404 }
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static editTodos(req, res, next) {
    const id = req.params.id
    const { title, description, status, due_date } = req.body
    Todo.update({ title, description, status, due_date }, {
      where: {
        id: +id
      },
      returning: true
    })
      .then(data => {
        if (!data[0]) throw { error: 'Not Found', status: 404 }
        res.status(200).json(data[1])
      })
      .catch(err => {
        next(err)
      })
  }
  static editStatusTodos(req, res, next) {
    const id = req.params.id
    const { status } = req.body
    Todo.update({ status }, {
      where: {
        id: +id
      },
      returning: true
    })
      .then(data => {
        if (!data[0]) throw { error: 'Not Found', status: 404 }
        res.status(200).json(data[1])
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteTodo(req, res, next) {
    const id = req.params.id
    Todo.destroy({
      where: {
        id: +id
      }
    })
      .then(data => {
        if (!data) throw { error: 'Not Found', status: 404 }
        res.status(200).json({ message: 'todo success to delete' })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TodoController