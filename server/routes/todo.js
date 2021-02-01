const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.get('/add', TodoController.add)

router.post('/add', TodoController.addPost)

router.get('/list', TodoController.showAll)

router.get('/:todoId', TodoController.findById)

router.put('/:todoId', TodoController.update)

router.patch('/:todoId', TodoController.updateStatus)

router.delete('/:todoId', TodoController.delete)

module.exports = router