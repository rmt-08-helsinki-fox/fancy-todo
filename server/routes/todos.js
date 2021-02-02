const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authorization } = require('../middlewares/auth')

router.post('/todos', TodoController.addTodo)
router.get('/todos', TodoController.showTodos)
router.get('/todos/:id', authorization, TodoController.showTodoId)
router.put('/todos/:id', authorization, TodoController.editTodo)
router.patch('/todos/:id', authorization, TodoController.editStatusTodo)
router.delete('/todos/:id', authorization, TodoController.deleteTodo)

module.exports = router