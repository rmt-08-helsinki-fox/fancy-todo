const { Todo } = require("../models")

class Controller {
  static addTodo(req, res, next) {
    const UserId = req.decoded.id
    let { title, description, status, due_date } = req.body
    Todo.create({
      title,
      description,
      status,
      due_date,
      UserId
    }).then(todo => {
      res.status(201).json(todo)
    }).catch(err => {
      console.log(err);
      next(err)
    })
  }
  static viewTodo(req,res, next) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos)
      }).catch(err => {
        next(err)
      })
  }
  static findTodo(req, res, next) {
    console.log(req.params.id);
    let id = +req.params.id
    Todo.findOne({
      where: {
        id
      }
    }).then(todo => {
      res.status(200).json(todo)
    }).catch(err => {
      next(err)
    })
  }
  static updateTodo(req, res, next) {
    let id = +req.params.id
    let { title, description, status, due_date } = req.body
    Todo.update({title, description, status, due_date }, {
      where: {
        id
      },
        returning: true
    }).then(todo => {
      if (todo[0] === 0) {
        throw ({ name: "customError", message: "Error not found" })
      }
      res.status(201).json(todo[1][0])
    }).catch(err => {
      next(err)
    })
  }
  static updateStatus(req, res, next) {
    let id = +req.params.id
    let status = req.body.status
    Todo.update({status}, {
      where: {
        id
      },
      returning: true
    }).then(todo => {
      if (todo[0] === 0) {
        throw ({ name: "customError", message: "Error not found" })
      }
      res.status(201).json(todo[1][0])
    }).catch(err => {
      next(err)
    })
  }
  static deleteTodo(req, res, next) {
    let id = +req.params.id
    Todo.destroy({
      where: {
        id
      },
    }).then(todo => {
      if (todo === 0) {
        throw ({name: "customError", message: "Error not found"})
      }
      res.status(200).json({message: "Todo Succes to delete"})
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = Controller