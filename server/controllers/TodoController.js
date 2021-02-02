const { User, Todo } = require('../models/index')

class TodoController {
  static showTodoUser(req, res){
    const option = {
      where: {
        user_id: +req.user.id
      }
    }

    Todo.findAll(option)
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static showTodoById(req, res){
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
      user_id: +req.user.id
    }

    Todo.create(newTodo)
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(err => {
        const error = err.errors[0].message || "Internal Server Error"

        res.status(500).json({ error })
      })
  }

  static addTodoPublicById(req, res){
    const option = {
      where: {
        id: +req.params.id
      }
    }

    Todo.findOne(option)
      .then(todo => {
        const newTodo = {
          title: todo.title,
          description: todo.description,
          status: todo.status,
          due_date: todo.due_date,
          is_private: todo.is_private,
          user_id: +req.user.id
        }
        return Todo.create(newTodo)
      })
      .then(newCreate => {
        res.status(201).json(newCreate)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static editTodo(req, res){
    const newUpdate = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      is_private: req.body.is_private
    }
    const option = {
      where: {
        id: +req.params.id,
        user_id: +req.user.id
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

  static editTodoStatus(req, res){
    const newStatus = {
      status: req.body.status
    }
    const option = {
      where: {
        id: +req.params.id,
        user_id: +req.user.id
      },
      returning: true
    }

    Todo.update(newStatus, option)
      .then(todo => {
        res.status(200).json(todo[1][0])
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static editTodoPrivate(req, res){
    const newUpdate = {
      is_private: req.body.is_private
    }
    const option = {
      where: {
        id: +req.params.id,
        user_id: +req.user.id
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

  static deleteTodo(req, res){
    const option = {
      where: {
        id: +req.params.id
      }
    }
    Todo.destroy(option)
      .then(todo => {
        res.status(200).json({ msg: "Delete Success" })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = TodoController