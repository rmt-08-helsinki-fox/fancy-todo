const router = require('express').Router()
const TodoController = require('../controllers/todoController')

router.post('/', TodoController.postTodo)

module.exports = router