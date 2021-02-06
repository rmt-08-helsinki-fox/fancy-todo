const express = require("express");
const router = express.Router();
const controllers = require("../controllers/todoController");
const { authorization } = require("../middlewares/authenticate");

router.post("/todos", controllers.addTodo);
router.get("/todos", controllers.getAllTodos);
router.delete("/todos", controllers.deleteAllDoneTodo);
router.get("/todos/:id", authorization, controllers.getTodoById);
router.put("/todos/:id", authorization, controllers.updateTodo);
router.patch("/todos/:id", authorization, controllers.updateStatus);
router.delete("/todos/:id", authorization, controllers.deleteTodo);

module.exports = router;
