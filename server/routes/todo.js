const router = require('express').Router()
const TodoController = require('../controllers/todoController')

router.get('/', TodoController.showTodo)
router.post('/', TodoController.createTodo)
router.get('/:id', TodoController.showIdTodo)
router.put('/:id', TodoController.editTodo)
router.patch('/:id', TodoController.editStatus)

module.exports = router