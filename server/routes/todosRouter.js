const router = require("express").Router()
const TodoController = require("../controllers/TodoController")

const authentication = require("../middlewares/authentication")
const authorize = require("../middlewares/authorize")

router.use(authentication)

router.post("/", TodoController.addTodo)

router.get("/", TodoController.showTodos)

router.get("/:id", TodoController.showTodo)

router.put("/:id", authorize, TodoController.editTodo)

router.patch("/:id", authorize, TodoController.editTodoStatus)

router.delete("/:id", authorize, TodoController.deleteTodo)

module.exports = router