const router = require("express").Router()
const Controller = require("../controllers/controller")

router.get("/",Controller.showTodo)
router.post("/",Controller.postTodo)
router.get("/:id",Controller.getTodo)
router.put("/:id",Controller.putTodo)
router.patch("/:id",Controller.patchTodo)
router.delete("/:id",Controller.deleteTodo)

module.exports = router