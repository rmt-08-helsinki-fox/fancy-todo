const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')

router.use(authenticate)
router.post('/', TodoController.postTodo)
router.get('/', TodoController.getTodos)
router.get('/:id', authorize, TodoController.getTodoById)
router.put('/:id', authorize, TodoController.updateTodo)
router.patch('/:id', authorize, TodoController.updateStatusTodo)
router.delete('/:id', authorize, TodoController.deleteTodo)

module.exports = router