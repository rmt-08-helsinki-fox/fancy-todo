const express = require('express');
const router = express.Router();
const todoRouter = require('./todo.js');
const userRouter = require('./user.js');

router.get('/', (req, res) => {
    res.send('Hello world, dunia baru phase 2')
})

router.use('/todos', todoRouter);
router.use('/users', userRouter);

module.exports = router