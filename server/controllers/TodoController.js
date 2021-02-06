const { User, Todo } = require('../models/index')

class TodoController {
  static showTodoUser(req, res, next){
    const option = {
      where: {
        user_id: +req.user.id
      }
    }

    Todo.findAll(option)
    .then(todo => {
      if(todo.length === 0) throw {
        name: "customError",
        msg: "Data not found",
        code: 404
        }
      res.status(200).json(todo)
    })
    .catch(err => {
      next(err)
    })
  }

  static showTodoById(req, res, next){
    Todo.findByPk(+req.params.id)
      .then(todo => {
        if(user === null) throw {
          name: "customError",
          msg: "Data is null",
          code: 404
          }
        res.status(200).json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static createNewTodo(req, res, next){
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: false,
      due_date: req.body.due_date,
      is_private: false,
      user_id: +req.user.id
    }

    Todo.create(newTodo)
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static addTodoPublicById(req, res, next){
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
        next(err)
      })
  }

  static editTodo(req, res, next){
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
        next(err)
      })
  }

  static editTodoStatus(req, res, next){
    if (req.body.status === true){
      req.body.status = false
    }else {
      req.body.status = true
    }
    console.log(req.body.status)
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
        next(err)
      })
  }

  static editTodoPrivate(req, res, next){
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
        next(err)
      })
  }

  static deleteTodo(req, res, next){
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
        next(err)
      })
  }
}

module.exports = TodoController