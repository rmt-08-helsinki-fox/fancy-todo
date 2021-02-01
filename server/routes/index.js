const router = require("express").Router()
const todos = require("./todos")
const Controller = require("../controllers/controller")

router.use("/todos", todos)

module.exports = router