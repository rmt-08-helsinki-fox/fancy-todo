const express = require('express');
const router = express.Router();
const todoRouter = require('./todoRoute');
const userRouter = require('./userRoute');
const weatherRouter = require('./weatherRoute');

router.use('/todos', todoRouter);
router.use('/users', userRouter);
router.use('/weathers', weatherRouter);

module.exports = router;