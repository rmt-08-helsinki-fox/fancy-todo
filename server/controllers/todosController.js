const { Todo } = require('../models')
class TodosController {

  static createTodos(req, res) {
    const { title, description, status, due_date } = req.body
    const objTodo = { title, description, status, due_date }
    Todo.create(objTodo)
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        res.status(400).json({ error : err.errors })
      } else {
        res.status(500).json({ error : 'Internal Server Error' })
      }
    });
  }

  static getTodos(req, res) {
    Todo.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  }

  static getTodosById(req, res) {
    let id = +req.params.id

    if (!id) { res.status(400).json({ error: 'Invalid Input'}) }
    
    else {
      Todo.findByPk(id)
      .then((data) => {
        if (!data) throw { status: 404, msg: 'Error Not Found' }
  
        res.status(200).json(data)
      })
      .catch((err) => {
        const status = err.status || 500
        const error = err.msg || 'Internal Server Error'
        res.status(status).json({ error })
      })
    }
    
  }
  
  static updateTodos(req, res) {
    const id = +req.params.id

    if (!id) { res.status(400).json({ error: 'Invalid Input'}) }
    else {
      const { title, description, status, due_date } = req.body
      const objTodo = { title, description, status, due_date }

      const options = {
        where : {
          id
        },
        returning : true
      }
      
      Todo.update(objTodo, options)
      .then((data) => {
        if (!data[0]) throw { status: 404, msg: 'Error Not Found'}

        res.status(200).json(data[1])
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          res.status(400).json({ error: err.errors})
        } else {
          const status = err.status || 500
          const error = err.msg || 'Internal Server Error'
          res.status(status).json({ error })
        }
      })
    }
  }
  
  static updateStatusTodos(req, res) {
    const id = +req.params.id
    const status = req.body.status
    
    const options = {
      where : {
        id
      },
      returning : true
    }

    if (!id) { res.status(400).json({ error: 'Invalid Input'}) }
    else {
      Todo.update({status}, options)
      .then((data) => {
        if (!data[0]) {
          throw {status: 400, msg: 'Error Not Found'}
        }
        res.status(200).json(data[1])
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          res.status(400).json(err.errors)
        } else {
          const status = err.status || 500
          const error = err.msg || 'Internal Server Error'
          res.status(status).json({error})
        }
      })
    }
  }

  static deleteTodos(req, res) {
    const id = +req.params.id
    const options = {
      where : {
        id
      }
    }

    if (!id) { res.status(400).json({ error: 'Invalid Input' }) }
    else {
      Todo.destroy(options)
      .then((data) => {
        if (!data) throw { status : 404, msg : 'Error Not Found' }
        res.status(200).json({ msg : 'todo success to delete' })
      })
      .catch((err) => {
        const status = err.status || 500
        const error = err.msg || 'Internal Server Error'
        res.status(status).json({ error })
      })
    }
  }
}

module.exports = TodosController