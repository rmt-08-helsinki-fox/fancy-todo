const express = require('express')
const router = express.Router()
const Controller = require('../controller/todoController')
const { authorize } = require('../middleware/auth')

router.post('/', Controller.createTodo)
router.get('/', Controller.getUserTodos)
router.get('/:id', authorize, Controller.getOneTodo)
router.patch('/:id', authorize, Controller.changeStatusTodo)
router.put('/:id', authorize, Controller.updateTodo)
router.delete('/:id', authorize, Controller.deleteTodo)

module.exports = router