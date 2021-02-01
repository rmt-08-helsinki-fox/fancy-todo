const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.post('/todos', TodoController.addTodo)
router.get('/todos', TodoController.showTodos)
router.get('/todos/:id', TodoController.showTodoId)
router.put('/todos/:id', TodoController.editTodo)
router.patch('/todos/:id', TodoController.editStatusTodo)
router.delete('/todos/:id', TodoController.deleteTodo)

module.exports = router