const todos = require('express').Router()
const todoController = require('../controller/todos')
const { authorized } = require('../middleware/auth')

todos.post('/', todoController.createTodo)

todos.get('/', todoController.readAll)
todos.get('/:id', authorized, todoController.readById)
todos.put('/:id', authorized, todoController.putTodo)
todos.patch('/:id', authorized, todoController.patchTodo)
todos.delete('/:id', authorized, todoController.deleteTodo)


module.exports = todos