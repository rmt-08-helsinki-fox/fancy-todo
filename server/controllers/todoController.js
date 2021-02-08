const { Todo, User } = require('../models')
const mailjet = require('../helpers/mailjet')
const api_key = process.env.Api_Key_Calendarific

class TodoController {
  static createTodos(req, res, next) {
    const { title, description, status, due_date, priority } = req.body
    let dataToEmail
    const userId = req.access_token.id
    let dataTodo;
    Todo.create({
      title,
      description,
      status,
      due_date,
      userId,
      priority
    })
      .then(data => {
        dataTodo = data;
        dataToEmail = {
          title: data.title,
          description: data.description,
          status: data.status,
          due_date: data.due_date,
          priority: data.priority
        }
        return User.findByPk(data.userId)
      })
      .then(dataUser => {
        dataToEmail.email = dataUser.email
        return mailjet(dataToEmail.title, dataToEmail.due_date, dataToEmail.status, dataToEmail.priority, dataToEmail.email)
      })
      .then(data => {
        console.log(data.body);
        res.status(201).json({ dataTodo, msg: 'Check your email' })
      })
      .catch(err => {
        next(err)
      })
  }
  static findTodos(req, res, next) {
    const userId = req.access_token.id
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
        // if (!data) throw { error: 'Not Found', status: 404 }
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static editTodos(req, res, next) {
    const id = req.params.id
    const { title, description, status, due_date, priority } = req.body
    Todo.update({ title, description, status, due_date, priority }, {
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