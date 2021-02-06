const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/TodoController");
const { authentication, authorization } = require("../middleware/auth");

router.use(authentication);
router.get("/", TodoController.getTodos);
router.get("/:id", TodoController.getTodosById);
router.post("/", TodoController.postTodos);

router.put("/:id", authorization, TodoController.putTodosById);
router.patch("/:id", authorization, TodoController.patchTodosById);
router.delete("/:id", authorization, TodoController.deleteTodosById);

module.exports = router;
