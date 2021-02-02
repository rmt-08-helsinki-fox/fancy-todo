const router = require('express').Router();
const TodoController = require('../controller/todoController');

const mid = require('../helper/middleware');

router.use(mid);
router.get('/', TodoController.showAllTodos);
router.get('/:id', TodoController.showTodo);
router.post('/', TodoController.addTodo);
router.put('/:id', TodoController.updateTodo);
router.patch('/:id', TodoController.updateStatus);
router.delete('/:id', TodoController.destroy);

module.exports = router;