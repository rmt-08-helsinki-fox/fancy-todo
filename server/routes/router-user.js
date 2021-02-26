const routerUser = require('express').Router()
const ControllerUser = require('../controllers/controller-user')

routerUser.post('/register', ControllerUser.register)
routerUser.post('/login', ControllerUser.login)
routerUser.post('/googleLogin', ControllerUser.googleLogin);


module.exports = routerUser