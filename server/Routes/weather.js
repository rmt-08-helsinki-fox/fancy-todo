const router = require("express").Router();
const WeatherController = require("../controllers/weatherController")
const { Authentication } = require("../middleware/auth")


router.use(Authentication)
router.get('/', WeatherController.showWeather)
// router.get('/location', WeatherController.showLocation)

module.exports = router;

