const express = require("express")
const router = express.Router()
const TodoController = require("../controllers/todocontroller")
const authenticate = require("../middlewares/authenticate")
const authorize = require("../middlewares/authorize")

router.use(authenticate)
router.post("/create", TodoController.create)
router.get("/", TodoController.readAllTodos)
router.get("/weather", TodoController.getWeather)
router.use(authorize)
router.get("/:id", TodoController.todoFindById)
router.put("/edit/:id", TodoController.updateTodo)
router.patch("/statuscheck/:id", TodoController.updateStatusTodo)
router.delete("/delete/:id", TodoController.deleteTodo)

module.exports = router