const router = require('express').Router();
const TodoController = require('../controller/todoController');

const { mid, checkParamsId } = require('../helper/middleware');

router.use(mid);
router.get('/', TodoController.showAllTodos);
router.get('/:id', checkParamsId, TodoController.showTodo);
router.post('/', TodoController.addTodo);
router.put('/:id', checkParamsId, TodoController.updateTodo);
router.patch('/:id', checkParamsId, TodoController.updateStatus);
router.delete('/:id', checkParamsId, TodoController.destroy);
router.get('/:id/members', checkParamsId, TodoController.showMembers);
router.post('/:id/members/add', checkParamsId, TodoController.addMember);

module.exports = router;