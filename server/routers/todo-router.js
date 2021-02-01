const express = require("express")
const router = express.Router()
const TodoControll = require("../controllers/todoControll")

router.post("/", TodoControll.add)

router.get("/", TodoControll.findAll)
router.get("/:id", TodoControll.findById)

router.put("/:id", TodoControll.updateAll)
router.patch("/:id", TodoControll.updateStatus)

router.delete("/:id", TodoControll.delete)

module.exports = router