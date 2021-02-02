const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const weatherRouter = require('./weatherRouter')
const { errorHandler } = require('../middlewares/errorhandler')



router.get('/', (req, res) => {
  res.send('ini home')
})

router.use('/todos', todoRouter)
router.use('/', userRouter)
router.use('/weather', weatherRouter)
router.use(errorHandler)
module.exports = router