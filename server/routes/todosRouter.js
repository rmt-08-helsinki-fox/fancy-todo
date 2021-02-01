const router = require("express").Router()
const todoController = require("../controllers/todoController")

router.post("/", todoController.addTodo)

module.exports = router