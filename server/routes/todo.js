const router = require("express").Router();
const TodoController = require("../controllers/todoController");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

router.use(authenticate);
router.get("/", TodoController.showAllTodos);

router.post("/", TodoController.createTodo);

router.use("/:id", authorize);
router.get("/:id", TodoController.showTodoById);

router.put("/:id", TodoController.updateTodoById);

router.patch("/:id", TodoController.updateStatusTodo);

router.delete("/:id", TodoController.deleteTodo);

module.exports = router;
