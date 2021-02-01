const express = require('express')
const router = express.Router()
const Controller = require('../controllers/todoController.js')

router.post('/', Controller.postTodo)
router.get('/', Controller.getTodo)
router.get('/:id', Controller.getTodoById)
router.put('/:id', Controller.putTodoUpdate)
router.patch('/:id', Controller.patchTodoUpdate)
router.delete('/:id', Controller.deleteTodo)

module.exports = router