const routerTodo = require('express').Router()
const ControllerTodo = require('../controllers/controller-todo')
const authenticate = require('../middlewares/authenticate')
const routerUser = require('./router-user')
const authorize = require('../middlewares/authorize')

routerTodo.use(authenticate)
routerTodo.post('/todos', ControllerTodo.createTodo)
routerTodo.get('/todos', ControllerTodo.getTodo)
// routerTodo.use(authorize)
routerTodo.get('/todos/:id', authorize, ControllerTodo.getTodoById)
routerTodo.put('/todos/:id', authorize, ControllerTodo.putTodoUpdate)
routerTodo.patch('/todos/:id', authorize, ControllerTodo.patchTodoUpdate)
routerTodo.delete('/todos/:id', authorize, ControllerTodo.deleteTodo)

module.exports = routerTodo