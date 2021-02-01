const router = require("express").Router();
const todoController = require("../controllers/todoController")

router.post('/', todoController.addTodo)
router.get('/', todoController.showTodo)
router.get('/:id', todoController.findTodo)
router.put('/:id', todoController.editTodo)
router.patch('/:id', todoController.editTodoStatus)
router.delete('/:id', todoController.deleteTodo)

module.exports = router;