const router = require('express').Router()
const TodoController = require('../controllers/todoController')

const { authenticate } = require('../middleware/authentication')
const { authorize } = require('../middleware/authorization')

router.use(authenticate)

router.get('/', TodoController.showTodo)
router.get('/:id', TodoController.showById)

router.use(authorize)

router.post('/', TodoController.addTodo)
router.put('/:id', TodoController.updateById)
router.patch('/:id', TodoController.updateByPatch)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router;