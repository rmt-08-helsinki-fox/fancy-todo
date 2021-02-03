const Qur_anController = require('../controllers/qur_anController')
const { authenticate, authorize } = require('../middlewares/auth')
const router = require('express').Router()

router.get('/', Qur_anController.showAll)
router.get('/:id',Qur_anController.findOne)

module.exports = router