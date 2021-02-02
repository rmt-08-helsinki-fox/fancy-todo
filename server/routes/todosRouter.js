const router = require("express").Router()
const TodoController = require("../controllers/TodoController")

router.post("/", TodoController.addTodo)

router.get("/", TodoController.showTodos)

router.get("/:id", TodoController.showTodo)

router.put("/:id", TodoController.editTodo)

router.patch("/:id", TodoController.editTodoStatus)

router.delete("/:id", TodoController.deleteTodo)

module.exports = router