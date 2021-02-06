const router = require('express').Router()
const todosController = require('../controllers/todosController')
const { authenticate } = require('../middlewares/authenticate')
const { authorize } = require('../middlewares/authorize')


router.get('/news', todosController.getHeadLineNews)
router.use(authenticate)
router.post('/add', todosController.add)
router.get('/', todosController.getTodos)
router.get('/:id', authorize, todosController.getTodo)
router.put('/:id', authorize, todosController.putTodo)
router.patch('/:id', authorize, todosController.patchTodo)
router.delete('/:id', authorize, todosController.deleteTodo)


module.exports = router

