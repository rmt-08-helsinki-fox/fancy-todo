const router = require('express').Router();
const TodoController = require('../controller/todoController');

router.get('/todos', TodoController.showAllTodos);
router.get('/todos/:id', TodoController.showTodo);
router.post('/todos', TodoController.addTodo);
router.put('/todos/:id', TodoController.updateTodo);

module.exports = router;