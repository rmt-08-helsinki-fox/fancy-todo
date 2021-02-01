const app = require('express').Router()
const TodoController = require('../controller/todoController')

app.post('/', TodoController.createTodo)
app.get('/', TodoController.getAllTodo)
app.get('/:id', TodoController.findOneTodo)
app.put('/:id', TodoController.updateTodo)
app.patch('/:id', TodoController.updateStatusTodo)
app.delete('/:id', TodoController.deleteTodo)



module.exports = app