const router = require('express').Router()
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const TodoController = require('../controllers/todoController')

router.use(authenticate)
router.post('/', TodoController.createTodo)
router.get('/', TodoController.getAll)
router.get('/:id', authorize, TodoController.getById)
router.put('/:id', authorize, TodoController.updateTodo)
router.patch('/:id', authorize, TodoController.updateStatus)
router.delete('/:id', authorize, TodoController.destroyTodo)



module.exports = router