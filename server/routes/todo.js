const TodoController = require('../controllers/TodoController')

const router = require('express').Router()

router.get('/', TodoController.getTodos)
router.post('/', TodoController.addTodos)
router.get('/:id',TodoController.getTodosId)
router.put('/:id', TodoController.updateTodos)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.deleteStatus)

module.exports = router