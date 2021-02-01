const { Todo } = require('../models')

class Controller {
  static postTodos(req, res){
    const { title, description, due_date } = req.body 
     Todo.create({
       title, description, due_date
     })
     .then(data => {
       res.status(201).json(data)
     })
     .catch(err => {
       res.status(400).json(err)
     })
  }

  static getTodos(req, res){
    Todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static getTodosById(req, res){
    let id = +req.params.id
    Todo.findByPk(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json({ error })
    })
  }

  static putTodosById(req, res){
    const id = +req.params.id
    const { title, description, due_date } = req.body 
    Todo.update({
      title,
      description,
      due_date
    }, {where : {
      id
    }})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json(err)
    })
  }

  static patchTodosById(req, res){
    const id = +req.params.id
    Todo.update({
      status : true
    }, {where : {id}})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json(err)
    })
  }
}

module.exports = Controller