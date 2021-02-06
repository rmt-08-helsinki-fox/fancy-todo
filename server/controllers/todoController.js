const {Todo} = require('../models/index')
const axios = require('axios')

class TodoController {

  static addTodo(req, res, next){
    let {title, description, status, due_date} = req.body
    let { id } = req.user
    let addedTodo = null;

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
        addedTodo = todo

        // 3rd party API Wikipedia untuk memberikan referensi artikel terkait todo yang akan dikerjakan.
        return axios.get(`https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch=${todo.title}&format=json`)
      })
      .then( response => {
        res.status(201).json({
          addedTodo,
          references: response.data.query.search
        })
      })
      .catch( err => {
        err.from = 'todoController - addTodo'
        next(err)
      })
      
  }

  static todoGet(req, res, next){
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
        err.from = 'todoController - todoGet'
        next(err)
      })
  }
    
  static showTodoById(req, res, next){
    let selectedId = req.params.id

    Todo.findByPk(selectedId)
      .then( todo => {

      if(!todo){
        throw { 
          name: "customError", 
          message: "error not found",
          stats: 404
        }
      } else {
        res.status(200).json(todo)
      }
          
      })
      .catch( err => {
        err.from = 'todoController - showTodoById'
        next(err)
      })
  }

  static editTodo(req, res, next){
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
        throw { 
        name: "customError", 
        message: "error not found",
        stats: 404 
      }
      } else {
        res.status(200).json(todo[1][0])
      }
    
    })
    .catch( err => {
      err.from = 'todoController - editTodo'
      next(err)
    })

  }

  static editTodoStatus(req, res, next){
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
        throw { 
          name: "customError", 
          message: "error not found",
          stats: 404 
        }
      } else {
        res.status(200).json(todo[1][0])
      }

    })
    .catch( err => {
      err.from = 'todoController - editTodoStatus'
      next(err)
    })
  }

  static deleteTodo(req, res, next){
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
          throw { 
            name: "customError", 
            message: "error not found",
            stats: 404 
          }
        } else {
          res.status(200).json({ message: "todo succes to delete"})
        }
      })
      .catch( err => {
        err.from = 'todoController - deleteTodo'
        next(err)
      })
  }

}

module.exports = TodoController