const router = require('express').Router()
const ThirdPartyApiController = require('../controller/thirdPartyApiController')


router.get('/',ThirdPartyApiController.weather)


module.exports = router