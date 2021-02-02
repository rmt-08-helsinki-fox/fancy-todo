const { Todo } = require('../models')
const axios = require('axios');

class TodoController {
  // POST TODOS
  static addTodos(req, res, next) {
    let objTodos = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.decoded.id
    }
    Todo.create(objTodos)
      .then(dataTodo => {
          res.status(201).json(dataTodo)
      })
      .catch(err => {
        next(err)
      })
  }
  // GET TODOS
  static getTodos(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.decoded.id
      }
    })
      .then(dataTodos => {
        res.status(200).json(dataTodos)
      })
      .catch(err => {
        next(err)
      })
  }
  // GET TODOS BY ID
  static getTodosById(req, res, next) {
    let id = +req.params.id
    Todo.findByPk(id)
      .then(dataTodo => {
        if (!dataTodo) throw { msg: 'error not found'}
        res.status(200).json(dataTodo)
      })
      .catch(err => {
        next(err)
      })
  }
  // PUT TODOS BY ID - UPDATE ALL ROWS
  static updateTodosAll(req, res, next) {
    const id = +req.params.id
    const objTodos = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.update(objTodos, {
      where: {
          id
      },
      returning: true
    })
      .then(dataTodoUpdate => {
        res.status(200).json(dataTodoUpdate[1][0])
      })
      .catch(err => {
        next(err)
      }) 
  }
  // PATCH TODOS BY ID - UPDATE SELECTED ROWS
  static updateTodosSelectedRows(req, res, next) {
    const id = +req.params.id
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
      next(err)
    })
  }
  static deleteTodos(req, res, next) {
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
      next(err)
    })
  }
  // read book from open library
  static searchBook(req, res) {
    // const id_value = req.query.id_value
    axios({
      method: "get",
      url: `http://openlibrary.org/api/volumes/brief/isbn/0596156715.json`
    })
      .then(response => {
        res.json(response.data.records['/books/OL24194264M'].data.title)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = TodoController