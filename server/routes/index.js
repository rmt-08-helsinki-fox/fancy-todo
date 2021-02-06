const express = require("express");
const router = express.Router();
const UserRouter = require("./UserRouter");
const TodoRouter = require("./TodoRouter");

router.use("/users", UserRouter);
router.use("/todos", TodoRouter);

module.exports = router;
