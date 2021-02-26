const express = require('express')
const router = express.Router()
const Todo = require('../controllers/todoController')
const authorize = require('../middleware/authorize')

router.post('/', Todo.createTodo) 
router.get('/', Todo.getTodo) 
router.get('/:id',authorize,  Todo.findOneTodo) //authorize
router.put('/:id',authorize, Todo.editTodo) //authorize
router.patch('/:id',authorize, Todo.editStatusTodo) //authorize
router.delete('/:id', authorize, Todo.deleteTodo) //authorize
router.get('/:id', authorize, Todo.findOne) //authorize



module.exports = router