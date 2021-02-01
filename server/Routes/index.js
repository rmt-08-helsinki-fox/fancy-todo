const router = require("express").Router();
const todo = require("../Routes/todos")

router.use("/todos", todo)

module.exports = router;