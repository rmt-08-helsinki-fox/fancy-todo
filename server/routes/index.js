const router = require('express').Router()
const todoRoutes = require('./todo')
const user = require('./user')

router.use('/todos', todoRoutes)
router.use('/users', user)

module.exports = router