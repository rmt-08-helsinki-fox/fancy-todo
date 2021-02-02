const router = require('express').Router()
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const TodoController = require('../controllers/todoController')

router.use(authenticate)
router.post('/', TodoController.createTodo)
router.get('/', TodoController.getAll)
// router.use(authorize)
router.get('/:id', authorize, TodoController.getById)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.deleteTodo)



module.exports = router