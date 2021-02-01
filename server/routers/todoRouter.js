const express = require("express");
const router = express.Router();
const Controller = require("../controllers/todoController");

router.post("/todos", Controller.postTodos);

router.get("/todos", Controller.getTodos);

router.put("/todos/:id", Controller.putTodos);

router.patch("/todos/:id", Controller.patchTodos);

router.delete("/todos/:id", Controller.deleteTodos);

module.exports = router;
