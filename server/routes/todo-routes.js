const router = require('express').Router()
const ControllerTodo = require('../controllers/todo-controller')

router.post('/', ControllerTodo.post_todos)
router.get('/', ControllerTodo.show_todos)

router.get('/:id', ControllerTodo.show_todo_id)

router.put('/:id', ControllerTodo.put_todo)

router.patch('/:id', ControllerTodo.patch_todo)

router.delete('/:id', ControllerTodo.delete_todo)



module.exports = router