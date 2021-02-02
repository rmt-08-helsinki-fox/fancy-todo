const express = require('express')
const router = express.Router()
const TodoController = require('../controller/TodoController')
const {authorization} = require('../middleware/authz')



router.post('/', TodoController.TodoPost)

router.get('/', TodoController.getTodo)

router.get('/:id',authorization, TodoController.getTodoId)

router.put('/:id', authorization,TodoController.TodoPut)

router.patch('/:id', authorization, TodoController.PatchTodo)

router.delete('/:id',authorization,TodoController.deleteTodo)


module.exports = router