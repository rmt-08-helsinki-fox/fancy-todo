const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authorization } = require('../middlewares/auth')

router.post('/', TodoController.addTodo)
router.get('/', TodoController.showTodos)
router.get('/:id', authorization, TodoController.showTodoId)
router.put('/:id', authorization, TodoController.editTodo)
router.patch('/:id', authorization, TodoController.editStatusTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router