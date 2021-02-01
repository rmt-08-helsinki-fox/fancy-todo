const routes = require('express').Router()
const TodoController = require('../controllers/todoController')

routes.post('/', TodoController.add)
routes.get('/', TodoController.showList)
routes.get('/:id', TodoController.showById)
routes.put('/:id', TodoController.edit)
routes.patch('/:id', TodoController.editRow)
routes.delete('/:id', TodoController.delete)
module.exports = routes