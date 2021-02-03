const { Todo } = require('../models')
const axios = require('axios');

class TodoController {
  // POST TODOS
  static addTodos(req, res, next) {
    let objTodos = {
        title: req.body.title,
        description: req.body.description,
        status: false,
        due_date: req.body.due_date,
        UserId: req.decoded.id
    }
    Todo.create(objTodos)
      .then(dataTodo => {
          res.status(201).json(dataTodo)
      })
      .catch(err => {
        const message = err.errors.map(element => element.message)
        const error = { name: err.name, statusCode: 400, msg: message}
        next(error)
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
    const id = +req.params.id
    // Todo.findByPk(id)
    Todo.findOne({
      where: {
        id: id,
        UserId: +req.decoded.id
      }
    })
      .then(dataTodo => {
        res.status(200).json(dataTodo)
      })
      .catch(err => {
        next(err)
      })
  }
  // PUT TODOS BY ID - UPDATE ALL ROWS
  static updateTodosAll(req, res, next) {
    // let message = []
    // if (!req.body.title) {
    //   // const message = err.errors.map(element => element.message)
    //   // throw { name: 'Invalid Data', statusCode: 400, msg: 'Invalid Data'}
    //   message.push('Title is required')
    // } 
    // if (!req.body.description) {
    //   message.push(`Description is required`)
    // }
    // if (!req.body.status) {
    //   message.push(`Status is required`)
    // } 
    // if (!req.body.due_date) {
    //   message.push(`due_date is required`)
    // }
    // if (message.length > 0) {
    //   throw { name: `SequelizeValidationError`, statusCode: 400, msg: message}
    // } 
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
        res.status(200).json(dataTodoUpdate[1][0])
      })
      .catch(err => {
        const message = err.errors.map(element => element.message)
        const error = { name: err.name, statusCode: 400, msg: message}
        next(error)
      }) 
  }
  // PATCH TODOS BY ID - UPDATE SELECTED ROWS
  static updateTodosSelectedRows(req, res, next) {
    if (!req.body.status) {
      throw { name: `SequelizeValidationError`, statusCode: 400, msg: [`Status is required`]}
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
      const message = err.errors.map(element => element.message)
      const error = { name: err.name, statusCode: 400, msg: message}
      next(error)
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
      res.status(200).json({
        'messages': 'todo succes to delete'
      })
    })
    .catch(err => {
      next(err)
    })
  }
  // read book from open library 3rd PARTY API
  static searchBook(req, res) {
    axios({
      method: "get",
      // url: `http://openlibrary.org/search/lists.json?q=book&limit=20&offset=0`
      url: `https://openlibrary.org/works/OL45883W/Fantastic_Mr._FOX`
    })
      .then(response => {
        let people = []
        response.data.docs.forEach((element) => {
          people.push(element.full_url.split('/')[2])
        })
        // res.json({people})
        return axios({
          method: "get",
          url: `http://openlibrary.org/people/${people[0]}/lists.json`
        })
      })
      .then(response => {
        let listId = []
        response.data.entries.forEach((element) => {
          listId.push(element.url.split('/')[4])
        })
        // res.json(listId)
        return axios({
          method: "get",
          url: `https://openlibrary.org/works/${listId[0]}.json`
        })
      })
      .then(response => {
        res.json(response)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = TodoController