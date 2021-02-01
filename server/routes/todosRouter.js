const express = require("express")
const router = express.Router()
const TodoController = require("../controllers/todosController")

router.post("/todos", TodoController.addTodo)
router.get("/todos", TodoController.viewTodo)
router.put("/todos/:id", TodoController.updateTodo)
router.patch("/todos/:id", TodoController.updateStatus)
router.delete("/todos/:id", TodoController.deleteTodo)

module.exports = router