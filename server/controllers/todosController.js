const { Todo } = require("../models")

class Controller {
  static addTodo(req, res) {
    let { title, description, status, due_date } = req.body
    Todo.create({
      title,
      description,
      status,
      due_date
    }).then(todo => {
      res.status(201).json(todo)
    }).catch(err => {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json(err)
      } else {
        res.status(500)
      }
    })
  }
  static viewTodo(req,res) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos)
      }).catch(err => {
        res.status(500)
      })
  }
  static updateTodo(req, res) {
    let id = +req.params.id
    let { title, description, status, due_date } = req.body
    Todo.update({title, description, status, due_date }, {
      where: {
        id
      },
      returning: true
    }).then(todo => {  

      if (todo[0] === 0) {
        throw ({ message: "Error not found" })
      }
      res.status(200).json(todo[1][0])
    }).catch(err => {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json(err)
      } else if (err.message === "Error not found") {
        res.status(404).json(err)
      } {
        res.status(500)
      }
    })
  }
  static updateStatus(req, res) {
    let id = +req.params.id
    let status = req.body.status
    Todo.update({status}, {
      where: {
        id
      },
      returning: true
    }).then(todo => {
      if (todo[0] === 0) {
        throw ({ message: "Error not found" })
      }
      res.status(200).json(todo[1][0])
    }).catch(err => {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json(err)
      } else if (err.message === "Error not found") {
        res.status(404).json(err)
      } {
        res.status(500)
      }
    })
  }
  static deleteTodo(req, res) {
    let id = +req.params.id
    Todo.destroy({
      where: {
        id
      },
    }).then(todo => {
      if (todo === 0) {
        throw ({message: "Error not found"})
      }
      res.status(200).json({message: "Todo Succes to delete"})
    }).catch(err => {
      if (err.message === "Error not found") {
        res.status(404).json(err)
      } else {
        res.status(500)
      }
    })
  }
}

module.exports = Controller