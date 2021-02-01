const router = require('express').Router();
const Controller = require('../controllers/todo.js')

router.post('/', Controller.addTodo);

router.get('/', Controller.getTodo);

router.get('/:id', Controller.getTodoById);

router.put('/:id', Controller.editTodo);

router.patch('/:id', Controller.updateTodo);

router.delete('/:id', Controller.deleteTodo);

module.exports = router;