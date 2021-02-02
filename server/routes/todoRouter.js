const express = require('express')
const router = express.Router()
const Controller = require('../controllers/todoController.js')
const { authenticate, authorize } = require('../middlewares/authenticate.js')

router.use(authenticate)
router.post('/', Controller.postTodo)
router.get('/', Controller.getTodo)
router.get('/:id', authorize, Controller.getTodoById)
router.put('/:id', authorize, Controller.putTodoUpdate)
router.patch('/:id', authorize, Controller.patchTodoUpdate)
router.delete('/:id', authorize, Controller.deleteTodo)

module.exports = router