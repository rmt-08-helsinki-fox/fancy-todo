const router = require("express").Router()
const holidayControler = require("../controllers/holidayController")

router.get("/", holidayControler.getHoliday)

module.exports = router