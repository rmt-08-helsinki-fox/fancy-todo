const express = require('express')
const router = express.Router()
const user = require('./user')
const todo = require('./todo')
const { authenticate } = require('../middleware/auth')
const errHandler = require('../middleware/errorHandler')
const Api = require('../controller/apiController')

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'welcome to fancy todo database'
  })
})
router.use('/users', user)
router.get('/quotes', Api.getQuotes)
router.use(authenticate)
router.use('/todos', todo)
router.use(errHandler)

module.exports = router