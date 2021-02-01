const router = require('express').Router();
const TodoController = require('../controller/todoController');

router.post('/todos', TodoController.addTodo);

module.exports = router;