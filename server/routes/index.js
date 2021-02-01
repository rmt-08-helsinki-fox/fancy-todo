const router = require('express').Router()
const todoRoute = require('../routes/todo')

router.use('/todos', todoRoute)

module.exports = router