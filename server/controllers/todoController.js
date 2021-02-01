const { Todo } = require("../models/index")

class todoController {
  static addTodo(req, res) {
    // res.status(200).json("masuk controller")
    const { title, description, status, due_date } = req.body
    let newTodo = {
      title,
      description,
      status,
      due_date
    }

    Todo.create(newTodo)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      if (err.name == 'SequelizeValidationError') {
        let validationError = err.errors.map((error) => error.message)
        res.status(400).json({message: validationError})
      } else {
        res.status(500).json({message: err.message})
      }
    })
  }

  static showTodo(req, res) {
    Todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
  }

  static findTodo(req, res) {
    let id = +req.params.id

    Todo.findByPk(id)
    .then(data => {
      if (data !== null) {
        res.status(200).json(data)
      } else {
        throw {message: 'error not found'}
      }
    })
    .catch(err => {
      const error = err || err.message
      res.status(404).json(error)
    })
  }

  static editTodo(req, res) {
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

    Todo.findOne(options)
    .then(data => {
      if (data !== null) {
        return Todo.update(editedTodo, options)
      } else {
        throw {message: 'error not found'}
      }
    })

    .then(data => {
        res.status(200).json(data[1][0])
    })

    .catch(err => {
      const error = err || err.message
      if (err.name != 'SequelizeValidationError') {
        res.status(404).json(error)
      } else if (err.name == 'SequelizeValidationError') {
        let validationError = error.errors.map((error) => error.message)
        res.status(400).json({message: validationError})
      } else {
        res.status(500).json({message: error})
      }
    })
  }

  static editTodoStatus(req, res) {
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

    Todo.findOne(options)
    .then(data => {
      if (data !== null) {
        return Todo.update(editedTodo, options)
      } else {
        throw {message: 'error not found'}
      }
    })

    .then(data => {
        res.status(200).json(data[1][0])
    })

    .catch(err => {
      const error = err || err.message
      if (err.name != 'SequelizeValidationError') {
        res.status(404).json(error)
      } else if (err.name == 'SequelizeValidationError') {
        let validationError = error.errors.map((error) => error.message)
        res.status(400).json({validationError})
      } else {
        res.status(500).json({message: error})
      }
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
      if (data !== 0) {
        const message = 'todo success to delete'
        res.status(200).json({message})
      } else {
        throw {message: 'error not found'}
      }
    })

    .catch(err => {
      const error = err || err.message
      if(err.message) {
        res.status(404).json(error)
      } else {
        res.status(500).json(error)
      }
    })
  }
}

module.exports = todoController;