const { Todo } = require('../models')
const axios = require('axios');

class TodoController {
  // POST TODOS
  static addTodos(req, res, next) {
    console.log(req.decoded)
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
    // Todo.findByPk(id)
    Todo.findOne({
      where: {
        id: id,
        UserId: +req.decoded.id
      }
    })
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
    if (!req.body.title || !req.body.description || !req.body.status || !req.body.due_date) {
      throw (`Invalid data`)
    }
    const id = +req.params.id
    const objTodos = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.update(objTodos, {
      where: {
          id: id,
          UserId: +req.decoded.id
      },
      returning: true
    })
      .then(dataTodoUpdate => {
        if (dataTodoUpdate[0] == 0) {
          throw (`Invalid data`)
        } else {
          res.status(200).json(dataTodoUpdate[1][0])
        }
      })
      .catch(err => {
        next(err)
      }) 
  }
  // PATCH TODOS BY ID - UPDATE SELECTED ROWS
  static updateTodosSelectedRows(req, res, next) {
    if (!req.body.status) {
      throw (`Invalid data`)
    }
    const id = +req.params.id
    const objTodos = {
      status: req.body.status
    }
    Todo.update(objTodos, {
        where: {
            id: id,
            UserId: +req.decoded.id
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
        id: id,
        UserId: +req.decoded.id
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
  // read book from open library 3rd REST API
  static searchBook(req, res) {
    axios({
      method: "get",
      url: `http://openlibrary.org/api/volumes/brief/isbn/0596156715.json`
    })
      .then(response => {
        // res.json(response.data)
        res.json(response.data.records['/books/OL24194264M'].data.title)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = TodoController