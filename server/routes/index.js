const router = require('express').Router()
const todoRoutes = require('./todo')
const userRoutes = require('./user')

router.use('/todos', todoRoutes)

router.use('/user', userRoutes)

module.exports = router