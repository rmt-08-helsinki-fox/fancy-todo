const express = require('express')
const router = express.Router()
const Todo = require('../controllers/todoController')

const authenticate = require('../middleware/authenticate')

router.use(authenticate)
router.post('/', Todo.createTodo)
router.get('/', Todo.getTodo)
router.get('/:id', Todo.findOneTodo)
router.put('/:id', Todo.editTodo)
router.patch('/:id', Todo.editStatusTodo)
router.delete('/:id', Todo.deleteTodo)
module.exports = router