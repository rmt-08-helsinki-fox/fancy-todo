const router = require('express').Router()
const TodoRouter = require('./todoRoute')
const UserRouter = require('./userRoute')

router.use('/todos', TodoRouter)
router.use('/user', UserRouter)


module.exports = router