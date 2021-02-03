const router = require("express").Router()
const ApiController = require("../controllers/apicontroller")

router.get("/", ApiController.checkWeather)

module.exports = router