const router = require("express").Router();
const TodoController = require("../controllers/todoController")
const { Authentication, Authorization } = require("../middleware/auth")


router.use(Authentication)
router.get('/', TodoController.showTodo)
router.post('/', TodoController.addTodo)

router.use('/:id', Authorization)
router.get('/:id', TodoController.findTodo)
router.put('/:id', TodoController.editTodo)
router.patch('/:id', TodoController.editTodoStatus)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router;