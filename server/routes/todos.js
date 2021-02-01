const express = require('express')
const todos = express.Router()
const Controller = require('../controller/todosController')

todos.get('/', Controller.todosList)
todos.post('/', Controller.addTodos)
todos.get('/:id', Controller.findTodosbyId)
todos.put('/:id', Controller.editTodo)
todos.patch('/:id', Controller.editStatusTodo)
todos.delete('/:id', Controller.deleteTodo)

module.exports = todos