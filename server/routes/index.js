const express = require('express');
const router = express.Router();
const todoRouter = require("./todo");
const UserController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");
const Anime = require("../helpers/anime")

router.use("/todos", todoRouter);
router.get("/user", authentication, UserController.getUser);
router.get("/users", UserController.getUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/login-google", UserController.loginGoogle);
router.get("/anime", authentication, Anime.getAnime);

router.use(errorHandler)

module.exports = router;