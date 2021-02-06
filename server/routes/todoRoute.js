const router = require('express').Router()
const Controller = require('../controllers/todoController')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')

router.use(authenticate)
router.post('/', Controller.postTodo)
router.get('/', Controller.getTodos)
router.get('/:id', authorize, Controller.getTodoById)
router.put('/:id', authorize, Controller.updateTodo)
router.patch('/:id', authorize, Controller.updateStatusTodo)
router.delete('/:id', authorize, Controller.deleteTodo)

module.exports = router