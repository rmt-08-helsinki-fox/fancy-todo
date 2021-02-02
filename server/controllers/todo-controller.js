const { Todo, User } = require('../models/')

class ControllerTodo {

  static showTodos(req, res) {
    Todo.findAll({
      order: [["id"]]
    })
    .then((todos) => {
      res.status(200).json(todos)
    })
    .catch(err => {
      res.status(500).json( { message: 'Internal ServerError' } )
    })

  }

  static postTodos(req, res) {
    
    let user_id = req.userData.id

    const { title, description, status, due_date } = req.body
    
    let obj = { title, description, status, due_date, user_id }
    
    Todo.create(obj)
    .then((todo) => {
      res.status(201).json(todo)
    })
    .catch(err => {
      // error validasi
      if(Array.isArray(err.errors)) {
        res.status(400).json({ message: err.message })
      }
      else {
        // error server
        res.status(500).json({ message: 'Internal Server Error' })
      }
    })
  }

  static showTodoById(req, res) {
    
    let todoId = +req.params.id

    Todo.findByPk(todoId)
    .then(() => { 
      //parameter kosong karena sudah di search di authorization, data todo ambil dari req.todo pada saat authorization
      let findedTodo  = req.todo
      res.status(200).json(findedTodo)
    })
    .catch(err => {
      // error yang 404 pindah ke authorization
      res.status(500).json({ message: 'Internal Server Error' })
    })
  }

  static putTodo(req, res) {

    let todoId = +req.params.id

    const { title, description, status, due_date } = req.body

    let obj = { title, description, status, due_date }

    //langsung diupdated karena findTodo sudah di authorization
    Todo.update(obj, {
      where: {
        id: todoId
      },
      returning: true
    })
    .then((updatedTodo) => {
      res.status(200).json(updatedTodo)
    })
    .catch(err => {
      // error validasi
      if(Array.isArray(err.errors)) {
        res.status(400).json({ message: err.message })
      }
      else {
        // error server
        res.status(500).json({ message: 'Internal Server Error'})
      }
    })
    
  }

  static patchTodo(req, res) {

    let id = +req.params.id
    //jangan langsung passing req.body
    const { status } = req.body

    Todo.update({ status }, {
      fields: ['status'],
      where: {
        id
      },
      returning: true
    })
    .then(updatedTodo => {
      res.status(200).json(updatedTodo)
    })
    .catch(err => {
      //error validasi
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
    .then(() => {
      
      res.status(200).json({ message: 'todo success to delete'} )
    })
    .catch(err => {

      res.status(500).json({ message: 'Internal Server Error' })
    })
  }

}

module.exports = ControllerTodo