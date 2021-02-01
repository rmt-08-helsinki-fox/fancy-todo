const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todoController');

router.post('/', TodoController.addTodo);
router.get('/', TodoController.getTodos);
router.get('/:id', TodoController.getTodoById);
router.put('/:id', TodoController.updateAllField);
router.patch('/:id', TodoController.updateOneField);
router.delete('/:id', TodoController.deleteTodo);


module.exports = router;