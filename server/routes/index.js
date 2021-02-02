const routes = require('express').Router()
const UserController = require('../controllers/userController')
const TodoController = require('../controllers/todoController')

routes.post('/login', UserController.login)
routes.post('/register', UserController.register)

routes.get('/todos', TodoController.showAll)
routes.post('/todos', TodoController.create)
routes.put('/todos/:id', TodoController.update)
routes.patch('/todos/:id', TodoController.updateStatus)
routes.delete('/todos/:id', TodoController.delete)

module.exports = routes
