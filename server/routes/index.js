const router = require("express").Router()
const todosRouter = require("./todosRouter")
const userRouter = require("./userRouter")
const holidayRouter = require("./holidayRouter")

router.use("/users", userRouter)
router.use("/todos", todosRouter)
router.use("/holidays", holidayRouter)

module.exports = router