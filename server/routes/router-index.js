const router = require('express').Router()
const Controller = require('../controllers/controller')

router.post('/todos', Controller.createTodo)
router.get('/todos', Controller.getTodo)
router.get('/todos/:id', Controller.getTodoById)
router.put('/todos/:id', Controller.putTodoUpdate)
router.patch('/todos/:id', Controller.patchTodoUpdate)
router.delete('/todos/:id', Controller.deleteTodo)

module.exports = router