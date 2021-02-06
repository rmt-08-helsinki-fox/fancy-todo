const express = require('express')
const router = express.Router()
const Todo = require('../controllers/todoController')

router.post('/', Todo.createTodo)
router.get('/', Todo.getTodo)
router.get('/:id', Todo.findOneTodo)
router.put('/:id', Todo.editTodo)
router.patch('/:id', Todo.editStatusTodo)
router.delete('/:id', Todo.deleteTodo)
router.get('/:id', Todo.findOne)



module.exports = router