const router = require('express').Router()
const TodoController = require('../controllers/todoController')

router.post('/', TodoController.createTodo)
router.get('/', TodoController.getAllTodo)
router.get('/:id', TodoController.getAllTodoById)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.updateStatusTodo)
router.delete('/:id', TodoController.destroyTodo)

module.exports = router