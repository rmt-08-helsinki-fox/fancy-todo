const {Todo} = require('../models')

class ControllerUser {
  static listTodo(req, res){
    Todo.findAll()
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static addTodo(req, res){
    let {title, description, status, due_date} = req.body
    Todo.create({title, description, status,due_date})
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(err => {
      if(err.errors[0].path === 'due_date'){
        res.status(400).json({Message: 'Input Tanggal Tidak boleh lewat dari hari ini'})
      }else{
        res.status(500).json(err)
        }
    })
  }

  static getById(req, res){
    let id = +req.params.id
    Todo.findByPk(id)
    .then(todo => {
      if(todo === null){
        res.status(404).json({Message: 'Data Is Not Found'})
      }else{
        res.status(200).json(todo)
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static editTodo(req, res){
    let id = +req.params.id
    let status = req.body.status || false
    let {title, description, due_date} = req.body
    Todo.update({title, description, status, due_date}, {where: {id}, returning: true})
    .then(todo => {
      if(!todo[0]){
        res.status(404).json({Message: 'Data Is Not Found'})
      }else{
        res.status(200).json(todo[1])
      }
    })
    .catch(err => {
      if(err.errors[0].path === 'due_date'){
        res.status(400).json({Message: 'Input Tanggal Tidak boleh lewat dari hari ini'})
      }else{
        res.status(500).json(err)
      }
    })
  }

  static updateStatus(req ,res) {
    let id = +req.params.id
    let {status} = req.body
    Todo.update({status}, {where: {id}, returning: true})
    .then(todo => {
      if(!todo[0]){
        res.status(404).json({Message: 'Data Is Not Found'})
      }else{
        res.status(200).json(todo[1])
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static deleteTodo(req, res){
    let id = +req.params.id
    Todo.destroy({where: {id}, returning: true})
    .then(todo => {
      if(!todo){
        res.status(404).json({Message: 'Data Is Not Found'})
      }else{
        res.status(200).json({Message: 'todo success to delete'})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

}


module.exports = ControllerUser