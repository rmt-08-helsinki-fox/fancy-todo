const express = require("express");
const router = express.Router()
const controller = require("../controller/todo-controller")
const authenticate = require("../middlewares/authentication")
const authorize = require("../middlewares/authorization")

router.use(authenticate)
router.get("/", controller.getTodo)
router.post("/", controller.postTodo)
router.get("/:id",authorize , controller.getTodoId)
router.put("/:id",authorize , controller.putTodoId)
router.patch("/:id",authorize , controller.patchTodoId)
router.delete("/:id",authorize , controller.deleteTodoId)
router.get("/weather/today", controller.getWeather)

module.exports = router;