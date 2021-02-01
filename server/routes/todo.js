const router = require('express').Router()
const Controller = require('../controllers/controller')

router.post('/', Controller.postTodo)
router.get('/', Controller.getTodos)
router.get('/:id', Controller.getTodoById)
router.put('/:id', Controller.updateTodo)
router.patch('/:id', Controller.updateStatusTodo)
router.delete('/:id', Controller.deleteTodo)

module.exports = router