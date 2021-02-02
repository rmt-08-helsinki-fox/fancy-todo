const router = require("express").Router();
const todo = require("../Routes/todos")
const user = require("../Routes/user")
const weather = require("../Routes/weather")

router.use("/todos", todo)
router.use("/users", user)
router.use("/weather", weather)


module.exports = router;