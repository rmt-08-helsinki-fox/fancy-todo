const express = require("express");
const router = express.Router();
const todoRouter = require("./todoRouter");
const userRouter = require("./userRouter");
const ApiRouter = require("./ApiRouter");
const { authentication } = require("../middlewares/authenticate");

router.use("/", userRouter);
router.use(authentication);
router.use("/", todoRouter);
router.use("/", ApiRouter);

module.exports = router;
