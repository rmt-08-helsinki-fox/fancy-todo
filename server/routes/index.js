const router = require("express").Router()
const userRouter = require("./usersRouter")
const todoRouter = require("./todosRouter")
const covidRouter = require("./covidRouter")

router.use("/todos", todoRouter)
router.use("/users", userRouter)
router.use("/covid19", covidRouter)

module.exports = router