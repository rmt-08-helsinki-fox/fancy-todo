const express = require('express');
const router = express.Router();
const TodoController = require("../controllers/todoController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.use(authentication);
router.get("/", TodoController.getTodos);
router.post("/", TodoController.addTodo);

router.use(authorization);
router.get("/:id", TodoController.getTodo);
router.put("/:id", TodoController.putTodo);
router.patch("/:id", TodoController.patchTodo);
router.delete("/:id", TodoController.deleteTodo);



module.exports = router;