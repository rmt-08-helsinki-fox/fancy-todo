const express = require("express")
const router = express.Router()
const todosRoutes = require("./todoRoutes")

router.get("/" ,(req, res) => {
    res.send("haloo")
})

router.use(todosRoutes)

module.exports = router