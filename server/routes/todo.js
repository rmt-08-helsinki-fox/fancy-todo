const express = require("express")
const router = express.Router()
const TodoController = require('../controllers/todocontroller')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize') 

router.use(authenticate)
router.post('/', TodoController.addTodo)
router.get('/', TodoController.getTodo)

router.get('/exchange', TodoController.exchangeRate)

router.get('/:id', authorize, TodoController.getTodoId)
router.put('/:id', authorize, TodoController.putTodo)
router.patch('/:id', authorize, TodoController.patchTodo)
router.delete('/:id', authorize, TodoController.deleteTodo)

module.exports = router