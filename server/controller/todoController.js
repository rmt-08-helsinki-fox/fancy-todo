const { todo } = require('../models/index')

class TodoController {
  static createTodo (req, res, next) {
    let newTodo = { 
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    todo.create(newTodo)
      .then(dataTodo => {
        newTodo = {
          title: dataTodo.title,
          description: dataTodo.description,
          status: dataTodo.status,
          due_date: dataTodo.due_date,
        } 
        res.status(201).json(newTodo)
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllTodo (req, res, next) {
    todo.findAll()
      .then(dataTodo => {
        res.status(200).json(dataTodo)
      })
      .catch(err => {
        next(err)
      })
  }

  static findOneTodo (req, res, next) {
    let id = +req.params.id

    todo.findByPk(id)
      .then(dataTodo => {
        res.status(200).json(dataTodo)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateTodo (req, res, next) {
    let id = +req.params.id

    let updateTodo = {
      title: req.body.title, 
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    todo.update(updateTodo, {
      where: { id },
      returning: true
    })
      .then(dataTodo => {
        if(dataTodo[0] === 1){
          res.status(200).json(dataTodo[1][0])
        } else {
          next({name: 'NotFoundError', message: '404 Not Found'})
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateStatusTodo (req, res, next) {
    let id = +req.params.id

    let updateStatus = {
      status: req.body.status
    }

    todo.update(updateStatus, {
      where: { id },
      returning: true
    })
      .then(dataTodo => {
        if(dataTodo[0] === 1){
          res.status(200).json(dataTodo[1][0])
        } else {
          next({name: 'NotFoundError', message: '404 Not Found'})
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTodo (req, res, next) {
    let id = +req.params.id
    
    todo.destroy({where : {
      id
      }
    })
      .then(dataTodo => {
        if(dataTodo === 1){
          res.status(200).json({message: 'todo success to delete'})
        } else {
          next({name: 'NotFoundError', message: '404 Not Found'})
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TodoController