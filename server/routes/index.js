const express = require("express")
const router = express.Router()
const todosRouter = require("./todoRouter")
const userRouter = require("./userRouter")
const apiRouter = require("./apiRouter")

router.get("/" ,(req, res) => {
    res.send("haloo")
})

router.use("/todos", todosRouter)
router.use("/users", userRouter)
router.use("/api", apiRouter)

module.exports = router