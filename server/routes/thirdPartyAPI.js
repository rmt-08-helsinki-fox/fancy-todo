const router = require('express').Router()
const ThirdPartyAPI = require('../controllers/thirdPartyAPIController')


router.get('/getWeather', ThirdPartyAPI.getCurrWeather)

module.exports = router