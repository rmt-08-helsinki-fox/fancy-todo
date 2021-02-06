const express = require("express");
const router = express.Router();
const UserRoute = require("./UserRoute");
const TodoRoute = require("./TodoRoute");

router.use("/users", UserRoute);
router.use("/todos", TodoRoute);

module.exports = router;
