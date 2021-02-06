const express = require('express');
const router = express.Router();
const todoRouter = require("./todo");
const UserController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorHandler");

router.use("/todos", todoRouter);
router.get("/users", UserController.getUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/login-google", UserController.loginGoogle);

router.use(errorHandler)

module.exports = router;