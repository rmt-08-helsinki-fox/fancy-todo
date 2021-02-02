const route = require('express').Router()
const TodosController = require('../controllers/todosController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentication)
route.post('/', TodosController.createTodos)
route.get('/', TodosController.getTodos)

route.use('/:id', authorization)
route.get('/:id', TodosController.getTodosById)
route.put('/:id', TodosController.updateTodos)
route.patch('/:id', TodosController.updateStatusTodos)
route.delete('/:id', TodosController.deleteTodos)

module.exports = route