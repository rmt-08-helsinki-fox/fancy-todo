const router = require('express').Router();
const Controller = require('../controllers/todo.js')
const authorize = require('../middlewares/authorization.js')

router.post('/', Controller.addTodo);

router.get('/', Controller.getTodo);

router.get('/:id', authorize, Controller.getTodoById);

router.put('/:id', authorize, Controller.editTodo);

router.patch('/:id', authorize, Controller.updateTodo);

router.delete('/:id', authorize, Controller.deleteTodo);

router.get('/:id/news', authorize, Controller.getNewsById);

module.exports = router;