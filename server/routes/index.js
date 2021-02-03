const router = require("express").Router()
const todo = require('./todo')
const user = require('./user')
const api = require('./api')

router.use("/todos", todo)
router.use("/users", user)
router.use("/weather", api)


module.exports = router