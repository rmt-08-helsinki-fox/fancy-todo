const route = require('express').Router()
const TodosController = require('../controllers/todosController.js')

route.post('/todos', TodosController.createTodos)
route.get('/todos', TodosController.getTodos)
route.get('/todos/:id', TodosController.getTodosById)
route.put('/todos/:id', TodosController.updateTodos)
route.patch('/todos/:id', TodosController.updateStatusTodos)
route.delete('/todos/:id', TodosController.deleteTodos)

module.exports = route