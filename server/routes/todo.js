const router = require('express').Router()
const todoController = require('../controller/todoController')

router.post('/', todoController.PostAddTodo)

router.get('/', todoController.getTodo)

router.get('/:id', todoController.findTodo)

router.put('/:id', todoController.putTodo)

router.patch('/:id', todoController.patchTodo)

router.delete('/:id',todoController.destroyTodo)

module.exports = router