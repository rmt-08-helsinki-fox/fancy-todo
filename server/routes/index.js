const express = require("express");
const router = express.Router();
const TodoRouter = require("./TodoRouter");

router.use("/todos", TodoRouter);

module.exports = router;
