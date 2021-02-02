const express = require('express');
const router = express.Router();
const todoRouter = require("./todo");
const UserController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorHandler");

router.use("/todos", todoRouter);
router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(errorHandler)

module.exports = router;