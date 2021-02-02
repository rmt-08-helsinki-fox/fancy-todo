const { Todo } = require("../models/index")

class TodoController {
  static addTodo(req, res, next) {
    // res.status(200).json("masuk controller")
    const UserId = +req.userData.id
    const { title, description, status, due_date } = req.body
    let newTodo = {
      title,
      description,
      status,
      due_date,
      UserId
    }

    Todo.create(newTodo)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static showTodo(req, res, next) {
    const UserId = +req.userData.id
    console.log(UserId)

    Todo.findAll({
      where: {
        UserId
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static findTodo(req, res) {
    let id = +req.params.id

    Todo.findByPk(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static editTodo(req, res, next) {
    const id = +req.params.id
    const { title, description, status, due_date } = req.body
    const options = {
      where: {
        id
      },
      returning: true
    }
    let editedTodo = {
      title,
      description,
      status,
      due_date
    }

    Todo.update(editedTodo, options)
    .then(data => {
        res.status(200).json(data[1][0])
    })

    .catch(err => {
      next(err)
    })
  }

  static editTodoStatus(req, res, next) {
    const id = +req.params.id
    const { status } = req.body

    const options = {
      where: {
        id
      },
      returning: true
    }

    let editedTodo = {
      status
    }

    Todo.update(editedTodo, options)
    .then(data => {
        res.status(200).json(data[1][0])
    })

    .catch(err => {
      next(err)
    })
  }

  static deleteTodo(req, res) {
    const id = +req.params.id
    let options = {
      where: {
        id
      }
    }

    Todo.destroy(options)
    .then(data => {
        const message = 'todo success to delete'
        res.status(200).json({message})
    })

    .catch(err => {
      next(err)
    })
  }
}

module.exports = TodoController;