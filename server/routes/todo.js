const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authorize = require('../middleware/authorize')

router.get('/', TodoController.showTodoUser)

router.post('/', TodoController.createNewTodo)

router.get('/add/:id', TodoController.addTodoPublicById)

router.patch('/set-private/:id', authorize, TodoController.editTodoPrivate)

router.get('/:id', TodoController.showTodoById)

router.put('/:id',authorize, TodoController.editTodo)

router.patch('/:id', authorize, TodoController.editTodoStatus)

router.delete('/:id', authorize, TodoController.deleteTodo)


module.exports = router