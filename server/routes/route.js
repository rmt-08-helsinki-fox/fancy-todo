//@ts-check
const express = require("express")
const router = express.Router()

const toDoRouter = require("./toDo")
const userRouter = require("./user")

router.use("/todos", toDoRouter)
router.use("/users", userRouter)

module.exports = router
