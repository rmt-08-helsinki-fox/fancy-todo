const router = require('express').Router()
const todo = require('./todo')
const user = require('./user')
const movie = require('./movie')

router.use(user)
router.use('/todos', todo)
router.use('/movies', movie)

module.exports = router