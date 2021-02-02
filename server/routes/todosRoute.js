const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const authorize = require('../middlewares/authorize')

// add todo data
router.post('/', TodoController.addTodo)

// display todo data
router.get('/', TodoController.todoGet)

// middlewar authorize
router.use('/:id', authorize)

// display todo's data by id
router.get('/:id', TodoController.showTodoById)

// edit todo
router.put('/:id', TodoController.editTodo)

// edit todo's status
router.patch('/:id', TodoController.editTodoStatus)

// delete todo
router.delete('/:id', TodoController.deleteTodo)

module.exports = router