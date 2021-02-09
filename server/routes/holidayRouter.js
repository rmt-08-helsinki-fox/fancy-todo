const router = require("express").Router()
const holidayControler = require("../controllers/holidayController")

const authentication = require("../middlewares/authentication")

router.get("/", authentication, holidayControler.getHoliday)

module.exports = router