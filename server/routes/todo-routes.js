const router = require('express').Router()
const ControllerTodo = require('../controllers/todo-controller')

router.post('/', ControllerTodo.postTodos)
router.get('/', ControllerTodo.showTodos)

router.get('/:id', ControllerTodo.showTodoById)

router.put('/:id', ControllerTodo.putTodo)

router.patch('/:id', ControllerTodo.patchTodo)

router.delete('/:id', ControllerTodo.deleteTodo)



module.exports = router