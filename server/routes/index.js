const routes = require('express').Router()
const UserController = require('../controllers/userController')
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const ThirdPartyAPI = require('../controllers/3rdpartyAPI')

// User routing
routes.post('/login', UserController.login)
routes.post('/register', UserController.register)

routes.use(authentication)

// 3rd party API
routes.get('/openweather', ThirdPartyAPI.getWeather)

// Todo routing
routes.get('/todos', TodoController.showAll)
routes.post('/todos', TodoController.create)
routes.get('/todos/:id', authorize, TodoController.showByID)
routes.put('/todos/:id', authorize, TodoController.update)
routes.patch('/todos/:id', authorize, TodoController.updateStatus)
routes.delete('/todos/:id', authorize, TodoController.delete)

module.exports = routes
