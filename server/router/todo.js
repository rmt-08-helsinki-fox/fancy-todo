const express = require("express");
const router = express.Router()
const controller = require("../controller/todo-controller")

router.get("/", controller.getTodo)
router.post("/", controller.postTodo)
router.get("/:id", controller.getTodoId)
router.put("/:id", controller.putTodoId)
router.patch("/:id", controller.patchTodoId)
router.delete("/:id", controller.deleteTodoId)

module.exports = router;