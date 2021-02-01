const router = require('express').Router()
const TodoController = require('../controllers/todoController')

router.post('/', TodoController.addTodo)
router.get('/', TodoController.showTodo)
router.get('/:id', TodoController.showById)
router.put('/:id', TodoController.editById)
router.patch('/:id', TodoController.editByPatch)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router;