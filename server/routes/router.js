const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')

router.get('/', (req, res) => {
    res.send('okay')
})

router.use('/todos', todoRouter)

router.use('/', userRouter)

module.exports = router