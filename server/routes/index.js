const express = require('express');
const router = express.Router();
const toDosRouter = require('./todos');
const userRouter = require('./user');

router.use('/todos', toDosRouter);
router.use('/user', userRouter);

module.exports = router;