const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const thirdPartyAPIRouter = require('./thirdPartyAPI')

router.use('/',userRouter)
router.use('/todos',todoRouter)
router.use('/', thirdPartyAPIRouter)

module.exports = router