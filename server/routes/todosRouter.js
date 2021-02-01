const router = require('express').Router()
const todosController = require('../controllers/todosController')


router.post('/add', todosController.add)
router.get('/', todosController.getTodos)
router.get('/:id', todosController.getTodo)
router.put('/:id', todosController.putTodo)
router.patch('/:id', todosController.patchTodo)
router.delete('/:id', todosController.deleteTodo)


module.exports = router