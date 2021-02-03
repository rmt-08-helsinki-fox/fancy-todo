const express = require("express")
const router = express.Router()
const ApiController = require("../controllers/apicontroller")

router.get("/weather", ApiController.getWeather)

module.exports = router