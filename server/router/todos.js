const router = require('express').Router()
const TodoController = require('../controllers/todoController')

const { authenticate } = require('../middleware/authentication')
const { authorize } = require('../middleware/authorization')

router.use(authenticate)
router.get('/todos', TodoController.showTodo)
router.get('/news', TodoController.showNews)
router.use('/todos/:id', authorize)
router.post('/todos', TodoController.addTodo)
router.get('/todos/:id', TodoController.showById)
router.put('/todos/:id', TodoController.updateById)
router.patch('/todos/:id', TodoController.updateByPatch)
router.delete('/todos/:id', TodoController.deleteTodo)

module.exports = router;