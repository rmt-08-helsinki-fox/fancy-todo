const router = require("express").Router()
const todos = require("./todos")
const Controller = require("../controllers/controller")

router.post("/register", Controller.postRegister)
router.post("/login", Controller.postLogin)
router.use("/todos", todos)

module.exports = router