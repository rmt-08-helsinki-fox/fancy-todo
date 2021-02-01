const express = require("express")
const router = express.Router()
const TodoController = require("../controllers/todocontroller")

router.post("/todos/create", TodoController.create)
router.get("/todos", TodoController.readAllTodos)
router.get("/todos/:id", TodoController.todoFindById)
router.put("/todos/:id", TodoController.putTodoById)
router.patch("/todos/:id", TodoController.patchTodoById)
router.delete("/todos/:id", TodoController.deleteTodo)

module.exports = router