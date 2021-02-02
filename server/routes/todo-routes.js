const router = require('express').Router()
const ControllerTodo = require('../controllers/todo-controller')
const authentication  = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.post('/', authentication, ControllerTodo.postTodos)
router.get('/', authentication,  ControllerTodo.showTodos)


router.get('/:id',authentication, authorization, ControllerTodo.showTodoById)

router.put('/:id', authentication, authorization, ControllerTodo.putTodo)

router.patch('/:id', authentication, authorization, ControllerTodo.patchTodo)

router.delete('/:id', authentication, authorization, ControllerTodo.deleteTodo)



module.exports = router