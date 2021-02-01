const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')

// add todo data
router.post('/todos', TodoController.addTodo)

// display todo data
router.get('/todos', TodoController.todoGet)

// display todo's data by id
router.get('/todos/:id', TodoController.showTodoById)

// edit todo
router.put('/todos/:id', TodoController.editTodo)

// edit todo's status
router.patch('/todos/:id', TodoController.editTodoStatus)

// delete todo
router.delete('/todos/:id', TodoController.deleteTodo)

module.exports = router