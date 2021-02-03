const router = require('express').Router()
const { authenticate } = require('../middleware/auth')
const errorHandler = require('../middleware/errorHandler')
const newsApi = require('../controller/news')
const todos = require('./todos')
const user = require('./user')

router.use(user)
router.use(authenticate)
router.get('/news', newsApi.getData)
router.use('/todos', todos)

router.use(errorHandler)

module.exports = router