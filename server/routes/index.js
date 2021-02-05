const express = require('express');
const router = express.Router();
const todoRouter = require('./todos');
const userRouter = require('./users');
const weatherRouter = require('./weather');


router.use('/todos', todoRouter);
router.use('/users', userRouter);
router.use('/weather', weatherRouter);

module.exports = router;