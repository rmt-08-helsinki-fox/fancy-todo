const { Router } = require("express");
const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoController");
const { authenticate } = require("../middleware/auth");
const { authorization } = require("../middleware/authorization");

router.use(authenticate);

router.post("/todos", authorization, TodoController.postTodos);

router.get("/todos", TodoController.getTodos);

router.put("/todos/:id", authorization, TodoController.putTodos);

router.patch("/todos/:id", authorization, TodoController.patchTodos);

router.delete("/todos/:id", authorization, TodoController.deleteTodos);

module.exports = router;
