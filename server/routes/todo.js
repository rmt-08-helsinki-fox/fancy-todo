const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.get('/', TodoController.showTodoUser)

router.post('/create-new', TodoController.createNewTodo)

router.get('/add/:id', TodoController.addTodoPublicById)

router.get('/:id', TodoController.showTodoListById)

router.put('/:id', TodoController.editTodoById)

router.delete('/:id', TodoController.deleteTodoById)


module.exports = router