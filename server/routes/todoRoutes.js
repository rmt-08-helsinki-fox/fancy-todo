const router = require('express').Router();
const TodoController = require('../controller/todoController');

const mid = require('../helper/middleware');

router.use(mid);
router.get('/todos', TodoController.showAllTodos);
router.get('/todos/:id', TodoController.showTodo);
router.post('/todos', TodoController.addTodo);
router.put('/todos/:id', TodoController.updateTodo);
router.patch('/todos/:id', TodoController.updateStatus);
router.delete('/todos/:id', TodoController.destroy);

module.exports = router;