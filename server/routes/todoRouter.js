const express = require("express")
const router = express.Router()
const TodoController = require("../controllers/todocontroller")

router.post("/create", TodoController.create)
router.get("/", TodoController.readAllTodos)
router.get("/:id", TodoController.todoFindById)
router.put("/:id", TodoController.putTodoById)
router.patch("/:id", TodoController.patchTodoById)
router.delete("/:id", TodoController.deleteTodo)

module.exports = router