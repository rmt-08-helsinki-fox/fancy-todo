const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authenticate } = require('../middlewares/authenticate')
const { authorize } = require('../middlewares/authorize')

router.use(authenticate)

router.post('/add', TodoController.add)

router.get('/list', TodoController.showAll)

router.use('/:todoId', authorize)

router.get('/:todoId', TodoController.findById)

router.put('/:todoId', TodoController.update)

router.patch('/:todoId', TodoController.updateStatus)

router.delete('/:todoId', TodoController.delete)

module.exports = router