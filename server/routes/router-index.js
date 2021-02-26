const router = require('express').Router()
const routerUser = require('./router-user')
const routerTodo = require('./router-todo')

router.use(routerUser)
router.use(routerTodo)


module.exports = router