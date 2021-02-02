const {Todo} = require('../models')
const axios = require('axios')

class ControllerTodo {
  static listTodo(req, res, next){
    Todo.findAll()
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      next(err)
    })
  }

  static addTodo(req, res, next){
    let {title, description, status, due_date} = req.body
    let UserId = req.headers.UserId
    Todo.create({title, description, status, due_date, UserId})
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(err => {
      next(err)
    })
  }

  static getById(req, res, next){
    let id = +req.params.id
    let UserId = req.headers.UserId

    Todo.findOne({
      where: {id, UserId}
    })
    .then(todo => {
      if(todo === null){
        throw {
          name: "customError",
          status: 401,
          message: "You Not Authorized"
        }
      }else{
        res.status(200).json(todo)
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static editTodo(req, res, next){
    let id = +req.params.id
    let UserId = req.headers.UserId
    let status = req.body.status || false
    let {title, description, due_date} = req.body
    Todo.update({title, description, status, due_date}, {where: {id, UserId}, returning: true})
    .then(todo => {
      if(!todo[0]){
        throw {
          name: "customError",
          status: 401,
          message: "You Not Authorized"
        }
      }else{
        res.status(200).json(todo[1])
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateStatus(req ,res, next) {
    let id = +req.params.id
    let UserId = req.headers.UserId
    let {status} = req.body
    Todo.update({status}, {where: {id, UserId}, returning: true})
    .then(todo => {
      if(!todo[0]){
        throw {
          name: "customError",
          status: 401,
          message: "You Not Authorized"
        }
      }else{
        res.status(200).json(todo[1])
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteTodo(req, res, next){
    let id = +req.params.id
    let UserId = req.headers.UserId
    Todo.destroy({where: {id, UserId}, returning: true})
    .then(todo => {
      if(!todo){
        throw {
          name: "customError",
          status: 401,
          message: "You Not Authorized"
        }
      }else{
        res.status(200).json({Message: 'todo success to delete'})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static seeCalendar(req, res, next){
    let year = new Date().getFullYear()
    axios.get(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=id&year=${year}`)
    .then(response => {
      res.json(response.data.response.holidays)
    })
    .catch(err => {
      next(err)
    })
  }

}


module.exports = ControllerTodo