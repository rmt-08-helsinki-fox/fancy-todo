const routes = require('express').Router()
const TodoController = require('../controllers/todoController')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
routes.use(authenticate)
routes.post('/', TodoController.add)
routes.get('/', TodoController.showList)
routes.get('/:id',authorize ,TodoController.showById)
routes.put('/:id', authorize,TodoController.edit)
routes.patch('/:id',authorize ,TodoController.editRow)
routes.delete('/:id',authorize ,TodoController.delete)
module.exports = routes