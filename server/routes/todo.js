const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')


router.post('/', TodoController.createTodo)
router.get('/', TodoController.getAll)
router.get('/:id', TodoController.getById)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.deleteTodo)



module.exports = router