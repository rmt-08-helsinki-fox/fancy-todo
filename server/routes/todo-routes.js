const router = require('express').Router()
const ControllerTodo = require('../controllers/todo-controller')
const authentication  = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


console.log('masuk routes')
router.use(authentication)
console.log('lewat authentication')
router.get('/', ControllerTodo.showTodos)
router.post('/', ControllerTodo.postTodos)


// router.use('/:id', authorization)
router.get('/:id', authorization, ControllerTodo.showTodoById)
router.put('/:id', authorization, ControllerTodo.putTodo)
router.patch('/:id', authorization, ControllerTodo.patchTodo)
router.delete('/:id', authorization, ControllerTodo.deleteTodo)



module.exports = router