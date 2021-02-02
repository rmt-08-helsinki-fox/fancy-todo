const e = require('express')
const {Todo} = require('../models/index')

class TodoController {

  static addTodo(req, res){
    let {title, description, status, due_date} = req.body
    let { id } = req.user

    if(status == 'true'){
      status = true
    }

    if(status == 'false'){
      status = false
    }
    
    let newTodo = {
      title,
      description,
      status,
      due_date,
      UserId : id
    }

    Todo.create(newTodo)
      .then( todo => {
        res.status(201).json(todo)
      })
      .catch( err => {

        if(err.name == 'SequelizeValidationError'){
          res.status(400).json({ message: "validation errors"})
        } else {
          res.status(500).json(err)
        }

      })
      
  }

  static todoGet(req,res){
    const { id } = req.user

    Todo.findAll({
      where : {
        UserId : id
      }
    })
      .then( todos => {
        res.status(200).json(todos)
      })
      .catch( err => {
        res.status(500).json(err)
      })
  }
    
  static showTodoById(req, res){
    let selectedId = req.params.id

    Todo.findByPk(selectedId)
      .then( todo => {

      if(!todo){
        throw { message: "error not found"}
      } else {
        res.status(200).json(todo)
      }
          
      })
      .catch( err => {

        if(err.message == 'error not found'){
          res.status(404).json(err)
        } else {
          res.status(500).json(err)
        }

      })
  }

  static editTodo(req, res){
    let selectedId = req.params.id
    const {title, description, status, due_date} = req.body

    let editedTodo = {
      title,
      description,
      status,
      due_date
    }

    Todo.update(editedTodo, {
      where :{
        id: selectedId
      },
      returning: true
    })
    .then( todo => {

      if(todo[1].length < 1){
        throw { message: "error not found"}
      } else {
        res.status(200).json(todo[1][0])
      }
    
    })
    .catch( err => {

      if(err.name == 'SequelizeValidationError'){
        res.status(400).json({ message: "validation errors"})
      } else if (err.message == 'error not found'){
        res.status(404).json(err)
      } else {
        res.status(500).json(err)
      }
      
    })

  }

  static editTodoStatus(req,res){
    let selectedId = req.params.id
    let {status} = req.body

    Todo.update({
      status
    }, {
      where :{
        id: selectedId
      },
      returning: true
    })
    .then( todo => {

      if(todo[1].length < 1){
        throw { message: "error not found"}
      } else {
        res.status(200).json(todo[1][0])
      }

    })
    .catch( err => {
      
      if (err.message == 'error not found'){
        res.status(404).json(err)
      } else if (err.name == 'SequelizeValidationError'){
        res.status(400).json({ message: "validation errors"})
      }   else {
        res.status(500).json(err)
      }

    })
  }

  static deleteTodo(req,res){
    let selectedId = req.params.id

    Todo.destroy(
      {
        where :{
          id: selectedId
        }
      })
      .then( todo => {

        console.log(todo)

        if(!todo){
          throw { message: "error not found"}
        } else {
          res.status(200).json({ message: "todo succes to delete"})
        }
      })
      .catch( err => {

        if(err.message == 'error not found'){
          res.status(404).json(err)
        } else {
          res.status(500).json(err)
        }

      })
  }

}

module.exports = TodoController