const { Todo } = require("../models/")

class TodoController {

  static addTodo(req, res) {
    const { title, description, status, due_date } = req.body
    Todo.create({ title, description, status, due_date })
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(err => {
        if (err.errors[0].type == 'Validation error') {
          res.status(400).json(err.errors)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static getTodo(req, res) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getTodoId(req, res) {
    const id = +req.params.id
    Todo.findByPk(id)
      .then(todo => {
        if (todo == null) {
          res.status(404).json({error: "not found"})
        } else {
          res.status(200).json(todo)
        }
      })
      .catch(err => {
          res.status(500).json(err)
      })
  }

  static putTodo(req, res) {
    const { title, description, status, due_date } = req.body
    Todo.update({ title, description, status, due_date },
      {
        where: {id: req.params.id},
        returning: true
      })
      .then(todo => {
        if (todo[0] == 0) {
          res.status(404).json({error: "not found"})
        } else {
          res.status(200).json(todo)
        }
      })
      .catch(err => {
        if (err.name == 'SequelizeValidationError') {
          res.status(400).json({error : "Validation error"})
        } else {
          res.status(500).json(err)
        }
      })

  }

  static patchTodo(req, res) {
    const id = req.params.id
    const { status } = req.body
    Todo.update({ status }, {where:{id}, returning:true})
      .then(todo => {
        if (todo[0] == 0) {
          res.status(404).json({error: "not found"})
        } else {
          res.status(200).json(todo)
        }
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          res.status(400).json({error: "Validation Error"})
        } else {
          res.status(500).json(err)
        }
      })
  }
  
  static deleteTodo(req, res) {
    const id = req.params.id
    Todo.destroy({where:{id}})
      .then(todo => {
        if (todo == 0) {
          res.status(404).json({error: "not found"})
        } else {
          res.status(200).json({message: "todo success to delete"})
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}

module.exports = TodoController