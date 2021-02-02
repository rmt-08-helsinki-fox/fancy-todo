const { Todo } = require('../models/')
class TodosController {
  
  static createTodos(req, res, next) {
    const { title, description, status, due_date } = req.body
    const objTodo = {
      title,
      description,
      status,
      due_date,
      user_id: req.decoded.id
    }
    Todo.create(objTodo)
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      next(err)
    });
  }
  
  static getTodos(req, res, next) {
    Todo.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  }
  
  static getTodosById(req, res, next) {
    let id = +req.params.id
    Todo.findByPk(id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }
  
  static updateTodos(req, res, next) {
    const id = +req.params.id
    
    const { title, description, status, due_date } = req.body
    const objTodo = {
      title,
      description,
      status,
      due_date,
      user_id: req.decoded.id
    }
    
    const options = {
      where : {
        id
      },
      returning : true
    }
    
    Todo.update(objTodo, options)
    .then((data) => {      
      res.status(200).json(data[1][0])
    })
    .catch((err) => {
      next(err)
    })
    
  }
  
  static updateStatusTodos(req, res, next) {
    const id = +req.params.id
    const status = req.body.status
    
    const options = {
      where : {
        id
      },
      returning : true
    }
    
    Todo.update({status}, options)
    .then((data) => {
      res.status(200).json(data[1][0])
    })
    .catch((err) => {
      next(err)
    })
  }
  
  static deleteTodos(req, res, next) {
    const id = +req.params.id
    const options = {
      where : {
        id
      }
    }
    
    Todo.destroy(options)
    .then(() => {
      res.status(200).json({ msg : 'todo success to delete' })
    })
    .catch((err) => {
      next(err)
    })
    
  }
}

module.exports = TodosController