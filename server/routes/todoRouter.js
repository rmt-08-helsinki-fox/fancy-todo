const app = require('express').Router()
const TodoController = require('../controller/todoController')
const { authorization } = require('../middlewares/auth')

app.post('/', TodoController.createTodo)
app.get('/', TodoController.getAllTodo)
app.get('/search', authorization,  TodoController.findTodo)
app.get('/:id', authorization,  TodoController.findOneTodo)
app.put('/:id', authorization, TodoController.updateTodo)
app.patch('/:id', authorization, TodoController.updateStatusTodo)
app.delete('/:id', authorization, TodoController.deleteTodo)



module.exports = app