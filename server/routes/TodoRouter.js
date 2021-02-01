const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/TodoController");

router.get("/", TodoController.getTodos);
router.get("/:id", TodoController.getTodosById);
router.post("/", TodoController.postTodos);
router.put("/:id", TodoController.putTodosById);
router.patch("/:id", TodoController.patchTodosById);
router.delete("/:id", TodoController.deleteTodosById);

module.exports = router;
