const router = require("express").Router()
const todos = require("./todos")
const UserController = require("../controllers/userController")
const EventController = require("../controllers/eventController")

router.get("/", EventController.showEvent)
router.post("/googleLogin", UserController.googleLogin)
router.post("/register", UserController.postRegister)
router.post("/login", UserController.postLogin)
router.use("/todos", todos)

module.exports = router