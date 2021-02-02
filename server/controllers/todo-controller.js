const { Todo } = require('../models/')

class ControllerTodo {

  static showTodos(req, res) {
    Todo.findAll()
    .then((todos) => {
      res.status(200).json(todos)
    })
    .catch(err => {
      res.status(500).json( { message: 'Internal ServerError' } )
    })

  }

  static postTodos(req, res) {
    const { title, description, status, due_date } = req.body
    
    let obj = { title, description, status, due_date }
    
    Todo.create(obj)
    .then((todo) => {
      res.status(201).json(todo)
    })
    .catch(err => {
      if(Array.isArray(err.errors)) {
        res.status(400).json({ message: err.message })
      }
      else {
        res.status(500).json({ message: 'Internal Server Error' })
      }
    })
  }

  static showTodoById(req, res) {
    let todoId = +req.params.id

    Todo.findByPk(todoId)
    .then(todo => {
      if(!todo) throw new Error('error not found')
      res.status(200).json(todo)
    })
    .catch(err => {
      res.status(404).json({ message: err.message })
    })
  }

  static putTodo(req, res) {

    let todoId = +req.params.id

    const { title, description, status, due_date } = req.body

    let obj = { title, description, status, due_date }

    Todo.findByPk(todoId)
    .then(todo => {
      // lempar jika todo tidak ditemukan
      if(!todo) throw new Error('error not found')
      return Todo.update(obj, {
        where: {
          id: todoId
        },
        returning: true
      })
    })
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      // error validasi
      if(Array.isArray(err.errors)) {
        res.status(400).json({ message: err.message })
      }
      //error yang diterima dari line 58
      else if(err.message === 'error not found') {
        res.status(404).json({ message: err.message })
      }
      else {
        //
        res.status(500).json({ message: 'Internal Server Error'})
      }
    })
    
  }

  static patchTodo(req, res) {
    let id = +req.params.id
    //jangan langsung passing req.body
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

  static deleteTodo(req, res) {
    
    let todoId = +req.params.id
    
    Todo.destroy({
      where: {
        id: todoId
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