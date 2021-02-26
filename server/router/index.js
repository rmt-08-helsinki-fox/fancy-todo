const router = require('express').Router()
const todos = require('./todos')
const users = require('./users')

router.use(users)
router.use(todos)


module.exports = router;