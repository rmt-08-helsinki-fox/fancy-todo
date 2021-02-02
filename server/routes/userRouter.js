const router = require('express').Router()
const UserController =  require('../controllers/userController')

router.post('/register', UserController.register)

// router.post('/login', (req, res) => res.send("masuk"))
router.post('/login', UserController.login)

module.exports = router