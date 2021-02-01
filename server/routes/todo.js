const router = require("express").Router();
const TodoController = require("../controllers/todoController");

router.get("/", TodoController.showAllTodo);

router.post("/", TodoController.createTodo);

router.get("/:id", TodoController.showTodoById);

router.put("/:id", TodoController.updateTodoById);

router.patch("/:id", TodoController.updateStatusTodo);

router.delete("/:id", TodoController.deleteTodo);
module.exports = router;
