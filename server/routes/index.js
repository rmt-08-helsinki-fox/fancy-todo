const express = require('express');
const router = express.Router();
const todoRouter = require('./todo.js')

router.get('/', (req, res) => {
    res.send('Hello world, dunia baru phase 2')
})

router.use('/todos', todoRouter)

module.exports = router