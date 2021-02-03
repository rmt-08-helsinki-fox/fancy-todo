const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
const TodoController = require("../controllers/TodoController");
const { authentication, authorization } = require("../helpers/middleware");

router.use(authentication);
router.get("/", TodoController.getTodos);
router.get("/:id", TodoController.getTodosById);
router.post("/", TodoController.postTodos);

// router.use(authorization);
router.put("/:id", authorization, TodoController.putTodosById);
router.patch("/:id", authorization, TodoController.patchTodosById);
router.delete("/:id", TodoController.deleteTodosById);

module.exports = router;
