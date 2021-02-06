const router = require("express").Router();
const WeatherController = require("../controllers/weatherController")

router.post('/', WeatherController.showWeather)

module.exports = router;

