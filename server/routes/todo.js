const router = require('express').Router()
const TodoController = require('../controllers/todoController')

const authentication = require('../middleware/authentication')
const authorize = require('../middleware/authorize')

router.use(authentication)
router.get('/', TodoController.showTodo)
router.post('/', TodoController.createTodo)
router.get('/show/:id', TodoController.showComic)

router.get('/:id', authorize, TodoController.showIdTodo)
router.put('/:id', authorize, TodoController.editTodo)
router.patch('/:id', authorize, TodoController.editStatus)
router.delete('/:id', authorize, TodoController.deleteTodo)

module.exports = router