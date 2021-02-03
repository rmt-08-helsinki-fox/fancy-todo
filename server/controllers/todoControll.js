const { Todo } = require("../models/")
const axios = require("axios")

class TodoControll {
  static add(req, res, next){
    let newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.dataUser.id
    }

    if(newTodo.status === ""){
      newTodo.status = "not done"
    }

    Todo.create(newTodo)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static findAll(req, res, next){
    let dataTodo

    Todo.findAll({
      where: {
        UserId: req.dataUser.id
      }
    })
    .then(data => {
      dataTodo = data
      return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Jakarta&APPID=6aa39f91b5429e15d47e5c9a7930e9bc`)
    })
    .then(dataCuaca => {
      res.status(200).json({dataTodo, dataCuaca: dataCuaca.data})
    })
    .catch(err => {
      next(err);
    })
  }

  static findById(req, res, next){
    const id = +req.params.id

    Todo.findByPk(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateAll(req, res, next){
    let newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(newTodo, {
      where: {
        id: +req.params.id
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

  static updateStatus(req, res, next){
    let newTodo = {}

    Todo.findByPk(+req.params.id)
    .then(data => {
      if(data.status === "done"){
        data.status = "not done"
      }else{
        data.status = "done"
      }
      newTodo.status = data.status
      return Todo.update(newTodo, {
        where: {
          id: +req.params.id
        },
        returning: true
      })
    })
    .then(data2 => {
      res.status(200).json(data2[1][0])
    })
    .catch(err => {
      next(err)
    })
  }

  static delete(req, res, next){
    Todo.destroy({
      where: {
        id: +req.params.id
      }
    })
    .then(() => {
      res.status(200).json({message: "todo has been deleted"})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = TodoControll