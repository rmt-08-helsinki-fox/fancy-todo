const express = require("express")
const router = express.Router()
const todosRouter = require("./todoRouter")
const userRouter = require("./userRouter")

router.get("/" ,(req, res) => {
    res.send("haloo")
})

router.use("/todos", todosRouter)
router.use("/users", userRouter)

module.exports = router