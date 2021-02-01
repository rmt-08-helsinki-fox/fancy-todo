const express = require('express')
const router = express.Router()
const TodoController = require('../controller/TodoController')


router.post('/', TodoController.TodoPost)

router.get('/', TodoController.getTodo)

router.get('/:id', TodoController.getTodoId)

router.put('/:id', TodoController.TodoPut)

router.patch('/:id', TodoController.PatchTodo)

router.delete('/:id',TodoController.deleteTodo)


module.exports = router