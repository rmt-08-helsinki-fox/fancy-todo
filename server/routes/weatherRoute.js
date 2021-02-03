const express = require('express');
const router = express.Router();
const WeatherController = require('../controllers/weatherController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);

router.post('/:id', authorization, WeatherController.postCity);
router.get('/:id', authorization, WeatherController.getForecastWeather);


module.exports = router;