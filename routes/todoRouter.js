const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.post('/', todoController.add)

router.get('/', todoController.getTodo)

router.get('/:id', todoController.findTodo)

router.put('/:id', todoController.editTodos)

router.patch('/:id', todoController.updateStatus)

router.delete('/:id', todoController.deleteTodo)

module.exports = router;
