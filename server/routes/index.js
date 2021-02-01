const express = require('express');
const router = express.Router();
const todoRouter = require('./todoRoute');
const userRouter = require('./userRoute');

router.use('/todos', todoRouter);
router.use('/users', userRouter);

module.exports = router;