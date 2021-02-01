const { Todo } = require('../models')

class TodoController {
  // POST TODOS
  static addTodos(req, res) {
    let objTodos = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
    }
    Todo.create(objTodos)
      .then(dataTodo => {
          res.status(201).json(dataTodo)
      })
      .catch(err => {
        const messages = {}
        if (err.errors.length > 0) {
          err.errors.forEach(element => {
              if (messages.message == undefined) {
                  messages.message = []
              }
              messages.message.push(element.message)
          })
          res.status(400).json(messages)
        } else {
              res.status(500).json(err)
        }
      })
  }
  // GET TODOS
  static getTodos(req, res) {
    Todo.findAll()
      .then(dataTodos => {
          res.status(200).json(dataTodos)
      })
      .catch(err => {
          res.status(500).json(err)
      })
  }
  // GET TODOS BY ID
  static getTodosById(req, res) {
    let id = +req.params.id
    Todo.findByPk(id)
      .then(dataTodo => {
          if (!dataTodo) throw { msg: 'error not found'}
          res.status(200).json(dataTodo)
      })
      .catch(err => {
          res.status(404).json(err)
      })
  }
  // PUT TODOS BY ID - UPDATE ALL ROWS
  static updateTodosAll(req, res) {
    const id = +req.params.id
    const objTodos = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.update(objTodos, {
      where: {
          id: id
      },
      returning: true
    })
      .then(dataTodoUpdate => {
        res.status(200).json(dataTodoUpdate[1][0])
      })
      .catch(err => {
        const messages = {}
        if (err.errors.length > 0) {
          err.errors.forEach(element => {
              if (messages.message == undefined) {
                  messages.message = []
              }
              messages.message.push(element.message)
          })
          res.status(400).json(messages)
        } else {
          res.status(500).json(err)
        }
      }) 
  }
  // PATCH TODOS BY ID - UPDATE SELECTED ROWS
  static updateTodosSelectedRows(req, res) {
    const id = +req.params.id
    if (req.body.status === undefined) {
      req.body.status = null
    }
    const objTodos = {
      status: req.body.status
    }
    Todo.update(objTodos, {
        where: {
            id: id
        },
        returning: true
    })
    .then(dataTodoUpdate => {
      res.status(200).json(dataTodoUpdate[1][0])
    })
    .catch(err => {
      const messages = {}
      if (err.errors.length > 0) {
        err.errors.forEach(element => {
            if (messages.message == undefined) {
                messages.message = []
            }
            messages.message.push(element.message)
        })
        res.status(400).json(messages)
      } else {
        res.status(500).json(err)
      }
    })
  }
  static deleteTodos(req, res) {
    let id = +req.params.id
    Todo.destroy({
      where: {
        id: id
      }
    })
    .then(dataTodo => {
      if (dataTodo == 0) {
        throw { msg: 'error not found'}
      } else {
        res.status(200).json({
          'messages': 'todo succes to delete'
        })
      }
    })
    .catch(err => {
      const error = err.msg || { msg: 'error not found'}
      if (error) {
        res.status(404).json(error)
      }
      res.status(500).json(err)
    })
  }
}

module.exports = TodoController