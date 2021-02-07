const express = require('express')
const router = express.Router()
const Todo = require('../controllers/todoController')
const authorize = require('../middleware/authorize')

router.post('/', Todo.createTodo) 
router.get('/', Todo.getTodo) 
router.get('/:id',  Todo.findOneTodo) //authorize
router.put('/:id', Todo.editTodo) //authorize
router.patch('/:id', Todo.editStatusTodo) //authorize
router.delete('/:id', Todo.deleteTodo) //authorize
router.get('/:id', Todo.findOne) //authorize



module.exports = router