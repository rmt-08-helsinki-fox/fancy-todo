const routerTodo = require('express').Router()
const ControllerTodo = require('../controllers/controller-todo')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

routerTodo.use(authenticate)
routerTodo.post('/todos', ControllerTodo.createTodo)
routerTodo.get('/todos', ControllerTodo.getTodo)

routerTodo.get('/todos/:id', authorize, ControllerTodo.getTodoById)
routerTodo.put('/todos/:id', authorize, ControllerTodo.putTodoUpdate)
routerTodo.patch('/todos/:id', authorize, ControllerTodo.patchTodoUpdate)
routerTodo.delete('/todos/:id', authorize, ControllerTodo.deleteTodo)

module.exports = routerTodo