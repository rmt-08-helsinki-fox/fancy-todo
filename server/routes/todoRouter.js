const express = require("express")
const router = express.Router()
const TodoController = require("../controllers/todocontroller")
const authenticate = require("../middlewares/authenticate")
const authorize = require("../middlewares/authorize")

router.use(authenticate)
router.post("/create", TodoController.create)
router.get("/", TodoController.readAllTodos)
router.use(authorize)
router.get("/:id", TodoController.todoFindById)
router.put("/:id", TodoController.updateTodo)
router.patch("/:id", TodoController.updateStatusTodo)
router.delete("/:id", TodoController.deleteTodo)

module.exports = router