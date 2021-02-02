const router = require("express").Router()
const userRouter = require("./usersRouter")
const todoRouter = require("./todosRouter")

router.use("/todos", todoRouter)
router.use("/users", userRouter)

module.exports = router