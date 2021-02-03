const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const {authenticate, authorization} = require('../middlewares/auth.js')



router.use(authenticate)
router.post('/', TodoController.postNewTodo)
router.get('/', TodoController.getAllTodos)

router.get('/:id', authorization, TodoController.getTodo)
router.put('/:id', authorization, TodoController.updateTodo)
router.patch('/:id', authorization, TodoController.patchTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router