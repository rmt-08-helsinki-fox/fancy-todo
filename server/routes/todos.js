const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')

const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', TodoController.createTodos)

router.get('/', TodoController.findTodos)

router.use('/:id', authorization)
router.get('/:id', TodoController.findTodosById)
router.put('/:id', TodoController.editTodos)
router.patch('/:id', TodoController.editStatusTodos)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router