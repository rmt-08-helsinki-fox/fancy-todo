const router = require('express').Router()
const todoRouter = require('./todoRouter')

router.get('/', (req, res) => {
    res.send('okay')
})

router.use('/todos', todoRouter)

module.exports = router