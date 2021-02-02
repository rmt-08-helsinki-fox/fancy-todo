const express = require('express')
const todos = express.Router()
const Controller = require('../controller/todosController')
const { authenticate } = require('../middleware/authentication')
const { authorize } = require('../middleware/authorize')

todos.use(authenticate)

todos.get('/', Controller.todosList)
todos.post('/', Controller.addTodos)
todos.get('/:id', authorize, Controller.findTodosbyId)
todos.put('/:id', authorize, Controller.editTodo)
todos.patch('/:id', authorize, Controller.editStatusTodo)
todos.delete('/:id', authorize, Controller.deleteTodo)

module.exports = todos