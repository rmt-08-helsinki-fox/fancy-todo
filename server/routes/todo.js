const TodoController = require('../controllers/TodoController')
const { authenticate, authorize } = require('../middlewares/auth')
const router = require('express').Router()

router.use(authenticate)
router.get('/', TodoController.getTodos)
router.post('/', TodoController.addTodos)
router.use(authorize)
router.get('/:id', TodoController.getTodosId)
router.put('/:id', TodoController.updateTodos)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.deleteStatus)

module.exports = router