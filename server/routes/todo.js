const express = require('express');
const router = express.Router();
const TodoController = require("../controllers/todoController");


router.get("/", TodoController.getTodos);
router.post("/", TodoController.addTodo);
router.get("/:id", TodoController.getTodo);
router.put("/:id", TodoController.putTodo);
router.patch("/:id", TodoController.patchTodo);
router.delete("/:id", TodoController.deleteTodo);



module.exports = router;