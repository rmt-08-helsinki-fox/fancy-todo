const router = require("express").Router()
const Controller = require("../controllers/controller")

router.get("/todos",Controller.showTodo)
router.post("/todos",Controller.postTodo)
router.get("/todos/:id",Controller.getTodoId)
router.put("/todos/:id",Controller.putTodo)
router.patch("/todos/:id",Controller.patchTodo)
router.delete("/todos/:id",Controller.deleteTodo)

module.exports = router