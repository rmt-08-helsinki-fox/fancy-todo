const router = require('express').Router()
const TodoController = require('../controllers/todoController')

router.post('/', TodoController.create)
router.get('/', TodoController.showAll)
router.get('/:id', TodoController.getOne)
router.put('/:id', TodoController.putTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.delete)

module.exports = router