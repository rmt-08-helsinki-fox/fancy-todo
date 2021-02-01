const { User, Todo } = require('../models/index')

class TodoController {
  static showTodoUser(req, res){
  
  }

  static showTodoListById(req, res){
    Todo.findByPk(+req.params.id)
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createNewTodo(req, res){
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      is_private: req.body.is_private,
      user_id: req.body.user_id
    }

    Todo.create(newTodo)
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static addTodoPublicById(req, res){

  }

  static editTodoById(req, res){
    const newUpdate = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      is_private: req.body.is_private,
      user_id: req.body.user_id
    }
    const option = {
      where: {
        id: +req.params.id
      },
      returning: true
    }

    Todo.update(newUpdate, option)
      .then(todo => {
        res.status(200).json(todo[1][0])
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteTodoById(req, res){
    const option = {
      where: {
        id: +req.params.id
      }
    }

    Todo.destroy(option)
      .then(todo => {
        res.status(200).json()
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = TodoController