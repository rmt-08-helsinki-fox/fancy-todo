const { Todo } = require('../models/')

class ControllerTodo {

  static show_todos(req, res) {
    Todo.findAll()
    .then((todos) => {
      res.status(200).json(todos)
    })
    .catch(err => {
      res.status(500).json( { error: err.message, msg: 'Internal ServerError' } )
    })

  }

  static post_todos(req, res) {
    const { title, description, status, due_date } = req.body
    
    let obj = { title, description, status, due_date }
    
    console.log(obj)
    Todo.create(obj)
    .then((todo) => {
      res.status(201).json(todo)
    })
    .catch(err => {
      if(Array.isArray(err.errors)) {
        res.status(400).json({ message: err.message })
      }
      else {
        res.status(500).json({ msg: 'Internal Server Error' })
      }
    })
  }

  static show_todo_id(req, res) {

    let id = +req.params.id

    Todo.findByPk(id)
    .then(todo => {
      if(!todo) throw new Error('error not found')
      res.status(200).json(todo)
    })
    .catch(err => {
      res.status(404).json({ message: err.message })
    })
  }

  static put_todo(req, res) {

    let id = +req.params.id

    const { title, description, status, due_date } = req.body

    let obj = { title, description, status, due_date }

    Todo.findByPk(id)
    .then(todo => {
      if(!todo) throw new Error('error not found')
      return Todo.update(obj, {
        where: {
          id
        },
        returning: true
      })
    })
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      if(Array.isArray(err.errors)) {
        res.status(400).json(err.message)
      }
      else if(err === 'error not found') {
        res.status(404).json({ message: err.message })
      }
      else {
        res.status(500).json('Internal Server Error')
      }
    })
    
  }

  static patch_todo(req, res) {
    let id = +req.params.id
    let status = req.body

    Todo.findByPk(id)
    .then(todo => {
      if(!todo) throw new Error('error not found')
      return Todo.update(status, {
        where: {
          id
        },
        fields: ['status'],
        returning: true
      })
    })
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      res.status(404).json({ message: err.message })
    })
  }

  static delete_todo(req, res) {
    
    let id= +req.params.id
    
    Todo.destroy({
      where: {
        id
      }
    })
    .then(todo => {
      if(!todo) throw new Error('error not found')
      res.status(200).json({ message: 'todo success to delete'} )
    })
    .catch(err => {
      if(err.message === 'error not found') {
        res.status(404).json({  message: err.message })
      }
      else {
        res.status(500).json({ message: 'Internal Server Error' })
      }
    })
  }

}

module.exports = ControllerTodo