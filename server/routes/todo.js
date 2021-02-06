const express = require('express');
const router = express.Router();
const TodoController = require("../controllers/todoController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const Anime = require("../helpers/anime")

router.use(authentication);
router.get("/", TodoController.getTodos);
router.post("/", TodoController.addTodo);
router.get("/anime", Anime.getAnime);

router.get("/:id/members", authorization, TodoController.getMembers);
router.patch("/:id/members", authorization, TodoController.addMember);
router.get("/:id", authorization, TodoController.getTodo);
router.put("/:id", authorization, TodoController.putTodo);
router.patch("/:id", authorization, TodoController.patchTodo);
router.delete("/:id", authorization, TodoController.deleteTodo);



module.exports = router;