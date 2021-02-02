const express = require("express")
const router = express.Router()
const TodoControll = require("../controllers/todoControll")
const authentic = require("../middlewares/authentication")
const authorized = require("../middlewares/authorization")

router.use(authentic)
router.post("/", TodoControll.add) //authentication

router.get("/", TodoControll.findAll) //authentication

// router.use(authorized)
router.get("/:id", authorized, TodoControll.findById) //authorization

router.put("/:id", authorized, TodoControll.updateAll) //authorization
router.patch("/:id", authorized, TodoControll.updateStatus) //authorization

router.delete("/:id", authorized, TodoControll.delete) //authorization

module.exports = router