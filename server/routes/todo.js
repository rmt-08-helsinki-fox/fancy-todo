const router = require("express").Router()
const TodoController = require('../controllers/todocontroller')

router.post('/', TodoController.addTodo)
router.get('/', TodoController.getTodo)
router.get('/:id', TodoController.getTodoId)
router.put('/:id', TodoController.putTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router