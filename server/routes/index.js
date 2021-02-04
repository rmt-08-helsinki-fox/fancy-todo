const router = require('express').Router()
const todoRoute = require('../routes/todo')
const userRoute = require('../routes/user')
const homeRoute = require('../routes/home')

router.use('/todos', todoRoute)
router.use('/users', userRoute)
router.use(homeRoute)

module.exports = router