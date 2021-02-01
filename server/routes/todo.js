const TodoController = require('../controller/todoController');

const router = require('express').Router();

router.post('/', TodoController.postTodos);
router.get('/', TodoController.getTodos);
router.get('/:id', TodoController.getTodoById);
router.put('/:id', TodoController.putTodoById);
router.patch('/:id', TodoController.patchTodoById);
router.delete('/:id', TodoController.delTodoById);

module.exports = router;