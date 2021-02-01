const router = require('express').Router()
const TodoRouter = require('../routes/todo')

router.use('/todos', TodoRouter)

module.exports = router