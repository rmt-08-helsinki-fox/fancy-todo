const express = require("express")
const router = express.Router()
const TodoController = require("../controllers/todosController")
const authenticate = require("../middlewares/authenticate")
const authorize = require("../middlewares/autorize")

router.use(authenticate)

router.post("/", TodoController.addTodo)
router.get("/", TodoController.viewTodo)
router.put("/:id", authorize, TodoController.updateTodo)
router.patch("/:id", authorize, TodoController.updateStatus)
router.delete("/:id", authorize, TodoController.deleteTodo)

module.exports = router