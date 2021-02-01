const router = require("express").Router()
const todoController = require("../controllers/todoController")

router.post("/", todoController.addTodo)

router.get("/", todoController.showTodos)

router.get("/:id", todoController.showTodo)

router.put("/:id", todoController.editTodo)

router.patch("/:id", todoController.editTodoStatus)

router.delete("/:id", todoController.deleteTodo)

module.exports = router