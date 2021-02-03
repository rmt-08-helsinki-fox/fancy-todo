const { Todo } = require('../models/index')
const { Op } = require("sequelize");

class TodoController {
  static createTodo (req, res, next) {
    let newTodo = { 
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.user.id
    }

    Todo.create(newTodo)
      .then(dataTodo => {
        newTodo = {
          id: dataTodo.id,
          title: dataTodo.title,
          description: dataTodo.description,
          status: dataTodo.status,
          due_date: dataTodo.due_date,
          UserId: dataTodo.UserId
        } 
        res.status(201).json(newTodo)
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllTodo (req, res, next) {
    let id = req.user.id
    Todo.findAll({where: {
      UserId : id
      }
    })
      .then(dataTodo => {
        res.status(200).json(dataTodo)
      })
      .catch(err => {
        next(err)
      })
  }

  static findOneTodo (req, res, next) {
    let UserId = req.user.id
    let search = `%${req.query.title}%`

    Todo.findAll({where: {
      title: {
        [Op.like]: search
        },
        UserId 
      }
    })
    .then(dataTodo => {
        res.status(200).json(dataTodo)
      })
      .catch(err => {
        console.log(err);
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

    Todo.update(updateTodo, {
      where: { id },
      returning: true
    })
      .then(dataTodo => {
        if(dataTodo[0] === 1){
          res.status(200).json(dataTodo[1][0])
        } else {
          throw ({name: 'NotFoundError', message: '404 Not Found'})
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

    Todo.update(updateStatus, {
      where: { id },
      returning: true
    })
      .then(dataTodo => {
        if(dataTodo[0] === 1){
          res.status(200).json(dataTodo[1][0])
        } else {
          throw({name: 'NotFoundError', message: '404 Not Found'})
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTodo (req, res, next) {
    let id = +req.params.id
    
    Todo.destroy({where : {
      id
      }
    })
      .then(dataTodo => {
        if(dataTodo === 1){
          res.status(200).json({message: 'todo success to delete'})
        } else {
          throw({name: 'NotFoundError', message: '404 Not Found'})
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TodoController